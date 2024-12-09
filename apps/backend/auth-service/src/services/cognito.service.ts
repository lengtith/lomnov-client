import * as crypto from "crypto";
import { jwtDecode } from "jwt-decode";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import {
  JwtPayload,
  ResponseChangeNewPasswordDTO,
} from "@/src/utils/types/indext";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  AdminGetUserCommand,
  AdminAddUserToGroupCommand,
  AdminDeleteUserCommand,
  ChangePasswordCommand,
  AdminUpdateUserAttributesCommand,
  AuthFlowType,
  GlobalSignOutCommand,
  GlobalSignOutCommandInput,
  GlobalSignOutCommandOutput
} from "@aws-sdk/client-cognito-identity-provider";
import configs from "@/src/config";
import {
  AuthenticationError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/src/utils/error/customErrors";
import {
  RequestConfirmPasswordResetDTO,
  ResponseConfirmPasswordResetDTO,
  RequestInitiatePasswordResetDTO,
  ResponseInitiatePasswordReset,
  RequestSignInDTO,
  ResponseSignInUserDTO,
  RequestSignUpUserDTO,
  RequestVerifyDTO,
  IRefreshTokenRequestDTO
} from "@/src/utils/types/indext";
import axios from "axios";
import setCookie from "../middlewares/cookies";


export class CognitoService {
  private cognitoClient: CognitoIdentityProviderClient;
  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: configs.awsCognitoRegion,
      credentials: {
        accessKeyId: configs.awsAccessKeyId,
        secretAccessKey: configs.awsSecretAccessKey,
      }
    });
  }

  private generateSecretHash(username: string | undefined): string {
    return crypto
      .createHmac("sha256", configs.awsCognitoClientSecret)
      .update(username + configs.awsCognitoClientId)
      .digest("base64");
  }

  public async signUpUser(
    request: RequestSignUpUserDTO,
  ): Promise<void> {
    const secretHash = this.generateSecretHash(request.email);
    const userAttributes = [
      {
        Name: "name",
        Value: request.username,
      },
      {
        Name: "email",
        Value: request.email,
      },
      {
        Name: "custom:roles",
        Value: request.role,
      }
    ];

    try {
      const command = new SignUpCommand({
        ClientId: configs.awsCognitoClientId,
        Username: request.email,
        Password: request.password,
        SecretHash: secretHash,
        UserAttributes: userAttributes,
      });

      if (!command) {
        throw new InternalServerError("Failed to create the sign-up command.");
      }

      await this.cognitoClient.send(command);

    } catch (error) {
      throw error;
    }
  }

  public async verifyUser(
    requestBody: RequestVerifyDTO,
  ): Promise<void> {
    const secretHash = this.generateSecretHash(requestBody.email);
    const confirmCommand = new ConfirmSignUpCommand({
      ClientId: configs.awsCognitoClientId,
      Username: requestBody.email,
      ConfirmationCode: requestBody.code,
      SecretHash: secretHash,
    });

    try {
      // Send the verification command to cognito
      await this.cognitoClient.send(confirmCommand);
      console.log('verification::: ', configs.awsCognitoUserPoolId, requestBody.email)

      // Get the user attribute from cognito
      const getUserCommand = new AdminGetUserCommand({
        UserPoolId: configs.awsCognitoUserPoolId,
        Username: requestBody.email,
      });
      const userResponse = await this.cognitoClient.send(getUserCommand);
      if (!userResponse) {
        throw new NotFoundError(
          `User with username ${requestBody.email} not found.`,
        );
      }
      console.log('user response::: ', userResponse)

      const userAttributes = userResponse.UserAttributes || [];

      const roleAttribute = userAttributes.find(
        (attr) => attr.Name === "custom:roles",
      );
      if (!roleAttribute || !roleAttribute.Value) {
        // If the "custom:roles" attribute is not found or has no value, throw an error
        throw new BadRequestError(
          `Role attribute "custom:roles" is missing for user ${requestBody.email}.`,
        );
      }
      const role = roleAttribute ? roleAttribute.Value : "user";

      const groupName = role === "admin" ? "admin" : "user";
      const addToGroupCommand = new AdminAddUserToGroupCommand({
        UserPoolId: configs.awsCognitoUserPoolId,
        Username: requestBody.email,
        GroupName: groupName,
      });
      if (!addToGroupCommand) {
        throw new InternalServerError(
          `Failed to add user ${requestBody.email} to group ${groupName}.`,
        );
      }

      await this.cognitoClient.send(addToGroupCommand);
      // Prepare user payload for database insertion
      const userPayload = {
        cognitoSub: userResponse.Username, // Use Username for cognitoSub
        email: requestBody.email,
        userName: userResponse.UserAttributes?.find(attr => attr.Name === 'name')?.Value || '',
      };

      console.log('user payload::: ', userPayload)

      // Insert user information into the database
      await axios.post(`${configs.userServiceUrl}/api/v1/users`, userPayload);

    } catch (error: any) {
      console.error('error:: ', error)
      throw error;
    }
  }

  public async signInUser(
    requestBody: RequestSignInDTO,
  ): Promise<ResponseSignInUserDTO> {
    const secretHash = this.generateSecretHash(requestBody.email);

    const command = new InitiateAuthCommand({
      ClientId: configs.awsCognitoClientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: requestBody.email,
        PASSWORD: requestBody.password,
        SECRET_HASH: secretHash,
      },
    });

    try {
      const response = await this.cognitoClient.send(command);
      const authResult = response.AuthenticationResult;
      const decodedToken = jwtDecode<JwtPayload>(authResult!.AccessToken!);
      const cognitoSub = decodedToken.sub;

      return {
        authResult,
        sub: cognitoSub,
      };
    } catch (error) {
      throw error;
    }
  }

  public async changeUserPassword(
    accessToken: string,
    previousPassword: string,
    proposedPassword: string,
  ): Promise<ResponseChangeNewPasswordDTO> {
    const command = new ChangePasswordCommand({
      AccessToken: accessToken,
      PreviousPassword: previousPassword,
      ProposedPassword: proposedPassword,
    });

    try {
      await this.cognitoClient.send(command);
      return { message: "Password changed successfully." };
    } catch (error: any) {
      throw error;
    }
  }

  public async initiatePasswordReset(
    requestBody: RequestInitiatePasswordResetDTO,
  ): Promise<ResponseInitiatePasswordReset> {
    // Input validation
    if (!requestBody.email) throw new ValidationError("Username is required.");
    const secretHash = this.generateSecretHash(requestBody.email);
    const command = new ForgotPasswordCommand({
      ClientId: configs.awsCognitoClientId,
      Username: requestBody.email,
      SecretHash: secretHash,
    });

    try {
      await this.cognitoClient.send(command);
      return {
        message: `Password reset initiated. Please check your email or phone for the code. (${requestBody.email})`,
      };
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw error;
      } else {
        throw new InternalServerError(` ${error.message}`);
      }
    }
  }

  public async confirmPasswordReset(
    requestBody: RequestConfirmPasswordResetDTO,
  ): Promise<ResponseConfirmPasswordResetDTO> {
    // Input validation
    if (
      !requestBody.email ||
      !requestBody.newPassword ||
      !requestBody.confirmationCode
    ) {
      throw new ValidationError(
        "Username, new password, and confirmation code are required.",
      );
    }
    const secretHash = this.generateSecretHash(requestBody.email);
    const command = new ConfirmForgotPasswordCommand({
      ClientId: configs.awsCognitoClientId,
      Username: requestBody.email,
      Password: requestBody.newPassword,
      ConfirmationCode: requestBody.confirmationCode,
      SecretHash: secretHash,
    });
    if (!command) {
      throw new InternalServerError(
        "Failed to create the ConfirmForgotPassword command.",
      );
    }

    try {
      await this.cognitoClient.send(command);
      return { message: "Password reset successfully." };
    } catch (error: any) {
      if (
        error instanceof ValidationError ||
        error instanceof InternalServerError
      ) {
        throw error;
      } else {
        throw new InternalServerError(
          `An unexpected error occurred: ${error.message}`,
        );
      }
    }
  }
  async refreshTokens({ refreshToken, username }: IRefreshTokenRequestDTO) {
    console.log(username);

    if (!refreshToken || !username) {
      throw new AuthenticationError("Refresh token or username missing");
    }
    const params = {
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: configs.awsCognitoClientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: this.generateSecretHash(username)
      }
    }
    try {
      const command = new InitiateAuthCommand(params);
      const result = await this.cognitoClient.send(command);
      return {
        accessToken: result.AuthenticationResult?.AccessToken!,
        idToken: result.AuthenticationResult?.IdToken!,
        refreshToken: result.AuthenticationResult?.RefreshToken! || refreshToken
      }
    } catch (error) {
      console.error("AuthService refreshToken() method error:", error);
      //@ts-ignore
      throw new Error("Failed to refresh token: ", error.message);
    }
  }
  public async deleteUser(cognitoUserSub: string): Promise<void> {
    const params = {
      UserPoolId: configs.awsCognitoUserPoolId, // The user pool ID for the user pool where you want to delete the user
      Username: cognitoUserSub, // The username (in this case, the Cognito user sub)
    };

    try {
      const command = new AdminDeleteUserCommand(params);
      await this.cognitoClient.send(command);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  public async getTokens(code: string): Promise<any> {
    try {
      const authorizationHeader = `Basic ${Buffer.from(
        `${configs.awsCognitoClientId}:${configs.awsCognitoClientSecret}`,
      ).toString("base64")}`;
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: configs.awsCognitoClientId,
        redirect_uri: configs.awsRedirectUri,
      });
      const response = await axios.post(
        `${configs.awsCognitoDomain}/oauth2/token`,
        params,
        {
          headers: {
            Authorization: authorizationHeader,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async verifyIdToken(idToken: string): Promise<any> {
    try {
      const verifier = CognitoJwtVerifier.create({
        userPoolId: configs.awsCognitoUserPoolId,
        tokenUse: "id",
        clientId: configs.awsCognitoClientId,
      });
      return await verifier.verify(idToken);
    } catch (error) {
      throw error;
    }
  }

  public async getUserAttributes(username: string): Promise<any> {
    try {
      const getUserCommand = new AdminGetUserCommand({
        UserPoolId: configs.awsCognitoUserPoolId,
        Username: username,
      });
      return await this.cognitoClient.send(getUserCommand);
    } catch (error) {
      throw error;
    }
  }

  public async updateUserRole(username: string, role: string): Promise<void> {
    try {
      const updateCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: configs.awsCognitoUserPoolId,
        Username: username,
        UserAttributes: [
          {
            Name: "custom:roles",
            Value: role,
          },
        ],
      });
      await this.cognitoClient.send(updateCommand);
    } catch (error) {
      throw error;
    }
  }

  public async addUserToGroup(
    username: string,
    groupName: string,
  ): Promise<void> {
    try {
      const addToGroupCommand = new AdminAddUserToGroupCommand({
        UserPoolId: configs.awsCognitoUserPoolId,
        Username: username,
        GroupName: groupName,
      });
      await this.cognitoClient.send(addToGroupCommand);
    } catch (error) {
      throw error;
    }
  }

  public async handleCallback(code: string, res: any): Promise<void> {
    try {
      const data = await this.getTokens(code);
      if (!data.access_token || !data.id_token) {
        throw new ValidationError("Failed to retrieve tokens");
      }
      // Set cookies for tokens
      setCookie(res, "accessToken", data.access_token)
      setCookie(res, "idToken", data.id_token)
      setCookie(res, "refreshToken", data.refresh_token)

      // Verify and decode the ID token
      const payload = await this.verifyIdToken(data.id_token);
      const username = payload.sub; // Extract the username
      setCookie(res, "username", username)

      const email = payload.email;
      if (!username) {
        throw new Error("Username not found in token");
      }

      // Get user attributes
      const userAttributes = await this.getUserAttributes(username);
      let roleAttribute = userAttributes.UserAttributes?.find(
        (attr: any) => attr.Name === "custom:roles",
      );

      if (!roleAttribute) {
        // Set default role
        await this.updateUserRole(username, "user");

        // Re-fetch attributes to determine role
        const updatedUserAttributes = await this.getUserAttributes(username);
        roleAttribute = updatedUserAttributes.UserAttributes?.find(
          (attr: any) => attr.Name === "custom:roles",
        );
      }

      const role = roleAttribute ? roleAttribute.Value : "user";
      // Add user to the appropriate group
      const groupName = role === "admin" ? "admin" : "user";
      await this.addUserToGroup(username, groupName);
      // Step 5: Insert user into database
      const userPayload = {
        cognitoSub: username, // Cognito user ID
        email: email,
        userName: payload['preferred_username'] || payload['name'], // Adjust based on available fields
      };

      await axios.post(
        `${configs.userServiceUrl}/api/v1/users`,
        userPayload
      );

    } catch (error) {
      throw error;
    }
  }
  public async signout(params: GlobalSignOutCommandInput):Promise<GlobalSignOutCommandOutput> {
    try {
      const command = new GlobalSignOutCommand(params);
      const result: GlobalSignOutCommandOutput = await this.cognitoClient.send(command);
      return result;
    } catch (error) {
      console.error("Error during signout in AuthService:", error);
      throw error;
    }
  }
}
