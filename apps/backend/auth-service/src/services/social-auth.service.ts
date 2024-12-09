import configs from "@/src/config";
import axios from "axios";
import { GoogleCallBackRequest } from "../controllers/types/social-auth.type";
import { CognitoToken } from "./types/social-auth.type";
import { InvalidInputError } from "../utils/error/customErrors";
import { jwtDecode } from "jwt-decode";
import {
    AdminAddUserToGroupCommand,
    AdminLinkProviderForUserCommand,
    AdminUpdateUserAttributesCommand,
    CognitoIdentityProviderClient,
    ListUsersCommand,
    AdminListGroupsForUserCommand,
    UserType,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
    region: configs.awsCognitoRegion,
    credentials: {
        accessKeyId: configs.awsAccessKeyId,
        secretAccessKey: configs.awsSecretAccessKey,
    },
});

class SocialAuthService {
    private awsCognitoDomain(endpoint: string = '') {
        return `${configs.awsCognitoDomain}${endpoint}`;
    }

    public loginWithGoogle(state: string = "user"): string {
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: configs.awsCognitoClientId,
            redirect_uri: configs.awsRedirectUri,
            identity_provider: 'Google',
            scope: 'openid profile email',
            state: state!,
            prompt: 'select_account',
        });
        return this.awsCognitoDomain(`/oauth2/authorize?${params.toString()}`);
    }

    public async getOAuthToken(query: GoogleCallBackRequest): Promise<CognitoToken> {
        try {
            const { code, error, state } = query;
            if (error || !code) {
                throw new InvalidInputError();
            }

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${configs.awsCognitoClientId}:${configs.awsCognitoClientSecret}`).toString('base64')}`,
            };
            const params = new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: configs.awsCognitoClientId,
                redirect_uri: configs.awsRedirectUri,
                code: code,
            });

            //Step 1:: Get the token from Cognito
            const cognitoDomain = this.awsCognitoDomain(`/oauth2/token`);
            // Sent http request to cognito to get the token and user data if the request success
            const response = await axios.post(cognitoDomain, params.toString(), { headers });
            const token = {
                accessToken: response.data.access_token,
                idToken: response.data.id_token,
                refreshToken: response.data.refresh_token,
            };
            // console.log(token)
            //Step 2:: Get the user info from token
            const userInfo = this.getUserInfoFromToken(token.idToken);
            console.log("USER INFO:: ", userInfo);
            //@ts-ignore
            const email = userInfo.email;
            const existingUser = await this.getUserByEmail(email);
            let userId: string;
            console.log("Existing USER::: ", existingUser);
            // Step 3: Case User is already signin with Email | Phone Number / Password, but they try to signin with Google | Facebook
            if (existingUser && existingUser.UserStatus !== 'EXTERNAL_PROVIDER') {
                await this.linkOrSyncUser(existingUser, userInfo, state!);
                userId = existingUser.Username!;
            } else {
                // Step 4: Case User is never signin with Google | Facebook
                /**
                 * SKIP
                 * else , create store user in db 
                 * userId = await this.createNewUser(userInfo, state!);
                 */
                try {
                    const user = await axios.post(`${configs.userServiceUrl}/api/v1/users`, {
                        cognitoSub: existingUser?.Username!,
                        email: email,
                        //@ts-ignore
                        userName: userInfo.name,
                        // @ts-ignore
                        profile: userInfo.profile,
                        role: state!
                    });
                    console.log("Step 4:: ", user.data);
                    //console.log(userInfo);

                    //@ts-ignore
                    //await this.updateUserCongitoAttributes(`${existingUser?.Username!}`, { 'custom:roles': state! });
                    // Step 4.1: Update user info in Cognito
                    userId = user.data._id;
                    const res = await this.updateUserCongitoAttributes(existingUser?.Username!, { 'custom:roles': state! });
                    //! TODO
                    console.log("Step 4.1:: ", res);
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 400) {
                        console.log('User already exists in user service, retrieving existing user info.');

                        //@ts-ignore
                        const existingUserResponse = await axios.get(`${configs.userServiceUrl}/api/v1/users?userName=${userInfo.name}`);
                        console.log(existingUserResponse.data);
                        console.log("UserId::: ", existingUserResponse.data.users[0]._id);

                        userId = existingUserResponse.data.users[0]._id
                    } else { throw error }
                }
            }
            // Step 5: Check if the user is already in the group before adding
            const groupExist = await this.checkUserInGroup(existingUser?.Username!, state!);
            if (!groupExist) {
                await this.addToGroup(existingUser?.Username!, state!);
                console.log(`User ${userInfo.sub} added to group ${state}`);
            }

            return {
                accessToken: token.accessToken,
                idToken: token.idToken,
                refreshToken: token.refreshToken,
                username: existingUser?.Username,
                userId: userId,
            };
        } catch (error) {
            console.error("Get OAuth Token Error::: ", error);
            throw error;
        }
    }

    public getUserInfoFromToken(token: string) {
        const decodeToken = jwtDecode(token);
        return decodeToken;
    }

    async getUserByEmail(email: string): Promise<UserType | undefined> {
        const params = {
            Filter: `email = "${email}"`,
            UserPoolId: configs.awsCognitoUserPoolId,
            Limit: 1,
        };
        try {
            const listUserCommand = new ListUsersCommand(params);
            const response = await client.send(listUserCommand);
            return response.Users && response.Users[0];
        } catch (error) {
            console.error("AuthService getUserByEmail() method error:", error);
            throw error;
        }
    }

    async linkAccount({
        sourceUserId,
        providerName,
        destinationUserId,
    }: {
        sourceUserId: string;
        providerName: string;
        destinationUserId: string;
    }): Promise<void> {
        const params = {
            DestinationUser: {
                ProviderName: 'Cognito',
                ProviderAttributeValue: destinationUserId,
            },
            SourceUser: {
                ProviderName: providerName,
                ProviderAttributeName: "Cognito_Subject",
                ProviderAttributeValue: sourceUserId,
            },
            UserPoolId: configs.awsCognitoUserPoolId,
        };
        try {
            const command = new AdminLinkProviderForUserCommand(params);
            await client.send(command);
        } catch (error) {
            console.error(`AuthService linkAccount() method error: `, error);
            throw error;
        }
    }

    async updateUserCongitoAttributes(username: string, attributes: { [key: string]: string }): Promise<void> {
        try {
            const params = {
                Username: username,
                UserPoolId: configs.awsCognitoUserPoolId,
                UserAttributes: Object.entries(attributes).map(([key, value]) => ({ Name: key, Value: value })),
            };
            console.log('params::: ', params)

            const command = new AdminUpdateUserAttributesCommand(params);
            await client.send(command);
        } catch (error) {
            console.error('Failed updateUserCognitoAttributes::: ', error)
            //@ts-ignore
            if (error.name === 'UserNotFoundException') {
                console.error(`User with username ${username} does not exist in Cognito.`);
            } else {
                console.error("AuthService updateUserCongitoAttributes() method error:", error);
                throw error;
            }
        }
    }

    async checkUserInGroup(username: string, groupName: string): Promise<boolean> {
        try {
            const params = {
                Username: username,
                UserPoolId: configs.awsCognitoUserPoolId,
            };
            console.log("Params::: ", params);

            const command = new AdminListGroupsForUserCommand(params);
            console.log("checking user in group...");

            const response = await client.send(command);
            console.log("Response:: ", response);
            const filterGroupName = response.Groups?.some(group => group.GroupName === groupName) || false;
            console.log("filterGroupName::: ", filterGroupName);

            return response.Groups?.some(group => group.GroupName === groupName) || false;
        } catch (error) {
            //@ts-ignore
            if (error.__type === 'UserNotFoundException') {
                console.log("user not found...!")
                return false;
            }
            console.error(`Error checking if user ${username} is in group ${groupName}:`, error);
            throw error;
        }
    }

    async addToGroup(username: string, groupName: string) {
        const params = {
            GroupName: groupName, /* required */
            UserPoolId: configs.awsCognitoUserPoolId, /* required */
            Username: username /* required */
        };
        console.log("Params Add User To Group:: ", params);
        try {
            const command = new AdminAddUserToGroupCommand(params);
            await client.send(command);
            console.log(`AuthService: User ${username} added to ${groupName} group`);
        } catch (error) {

            console.error(`Error adding user ${username} to group ${groupName}:\n`, error);
            throw error;
        }
    }

    async linkOrSyncUser(existingUser: UserType, userInfo: any, state: string): Promise<void> {
        const isLinked = existingUser.Attributes?.some(attr => attr.Name === 'identities' && attr.Value?.includes("Google"));
        if (!isLinked) {
            await this.linkAccount({
                sourceUserId: userInfo.sub!,
                providerName: 'Google',
                destinationUserId: existingUser.Username!,
            });
        }
        await this.updateUserCongitoAttributes(existingUser.Username!, { 'custom:roles': state });
    }

    async createNewUser(userInfo: any, groupName: string): Promise<string> {
        try {
            // insert user to user service!
            console.log('post user....');

            const user = await axios.post(`${configs.userServiceUrl}/api/v1/users`, {
                cognitoSub: userInfo.sub,
                email: userInfo.email,
                userName: userInfo.name,
                profile: userInfo.profile,
            });
            console.log('posted user....');

            console.log(`new user loging with google::: google_${userInfo.identities[0].userId}`)
            await this.updateUserCongitoAttributes(`google_${userInfo.identities[0].userId}`, { 'custom:roles': groupName! });
            return user.data._id;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                const existingUserResponse = await axios.get(`${configs.userServiceUrl}/api/v1/users?userName=${userInfo.name}`);
                console.log(existingUserResponse.data);

                return existingUserResponse.data.users[0]._id;
            } else {
                throw error;
            }
        }
    }
    async refreshToken(): Promise<void> {

    }
}

export default SocialAuthService;
