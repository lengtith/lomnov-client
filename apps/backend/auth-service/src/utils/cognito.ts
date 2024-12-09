import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from "crypto";


import {
  AdminGetUserCommand,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import configs from "../config";
const cognitoClient = new CognitoIdentityProviderClient({ region: configs.awsCognitoRegion });
const generateSecretHash = (username: string) => {
  return crypto
    .createHmac("sha256", configs.awsCognitoClientSecret)
    .update(username + configs.awsCognitoClientId)
    .digest("base64");
};

export const signUpUser = async (
  username: string,
  password: string,
  attributes: {
    name: string;
    phoneNumber?: string;
    email?: string;
    "custom:roles"?: string;
    "custom:group"?: string;
  },
) => {
  const secretHash = generateSecretHash(username);
  const userAttributes = [
    {
      Name: "name",
      Value: attributes.name,
    },
  ];

  if (attributes.phoneNumber) {
    userAttributes.push({
      Name: "phone_number",
      Value: attributes.phoneNumber,
    });
  }

  if (attributes.email) {
    userAttributes.push({
      Name: "email",
      Value: attributes.email,
    });
  }

  if (attributes["custom:roles"]) {
    userAttributes.push({
      Name: "custom:roles",
      Value: attributes["custom:roles"],
    });
  }

  if (attributes["custom:group"]) {
    userAttributes.push({
      Name: "custom:group",
      Value: attributes["custom:group"],
    });
  }

  const command = new SignUpCommand({
    ClientId: configs.awsCognitoClientId,
    Username: username,
    Password: password,
    SecretHash: secretHash,
    UserAttributes: userAttributes,
  });

  try {
    const response = await cognitoClient.send(command);
    return {
      message:
        "Sign up successful. Please check your phone or email for verification.",
      userSub: response.UserSub,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};



export const verifyUser = async (username: string, code: string) => {
  const secretHash = generateSecretHash(username);
  const confirmCommand = new ConfirmSignUpCommand({
    ClientId: configs.awsCognitoClientId,
    Username: username,
    ConfirmationCode: code,
    SecretHash: secretHash,
  });

  try {
    // Confirm the user's sign-up
    await cognitoClient.send(confirmCommand);

    // Get user attributes
    const getUserCommand = new AdminGetUserCommand({
      UserPoolId: configs.awsCognitoUserPoolId, // Ensure you have this defined
      Username: username,
    });

    const userResponse = await cognitoClient.send(getUserCommand);
    const userAttributes = userResponse.UserAttributes || [];

    // Determine the role from user attributes
    const roleAttribute = userAttributes.find(
      (attr) => attr.Name === "custom:roles",
    ); // Adjust if your role attribute is different

    const role = roleAttribute ? roleAttribute.Value : "user"; // Default to "user" if no role is found
    console.log(role);
    console.log(roleAttribute?.Value);

    // Determine the group based on the role
    const groupName = role === "admin" ? "admin" : "user"; // Replace with your actual group names
    // Add user to the appropriate group
    const addToGroupCommand = new AdminAddUserToGroupCommand({
      UserPoolId: configs.awsCognitoUserPoolId,
      Username: username,
      GroupName: groupName,
    });

    await cognitoClient.send(addToGroupCommand);

    return { message: "User verified and added to group successfully." };
  } catch (error: any) {
    console.error("Error verifying user and adding to group:", error);
    throw new Error(`Failed to verify user and add to group: ${error.message}`);
  }
};

export const signInUser = async (username: string, password: string) => {
  const secretHash = generateSecretHash(username);

  const command = new InitiateAuthCommand({
    ClientId: configs.awsCognitoClientId,
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  });

  try {
    const response = await cognitoClient.send(command);
    const authResult = response.AuthenticationResult;

    // Return a success message along with the authentication result
    return {
      message: "Sign-in successful!",
      authResult,
    };
  } catch (error: any) {
    if (error.name === "NotAuthorizedException") {
      throw new Error("The username or password is incorrect.");
    } else if (error.name === "UserNotConfirmedException") {
      throw new Error("The user has not been confirmed.");
    } else if (error.name === "PasswordResetRequiredException") {
      throw new Error("A password reset is required.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const initiatePasswordReset = async (username: string) => {
  const secretHash = generateSecretHash(username);
  const command = new ForgotPasswordCommand({
    ClientId: configs.awsCognitoClientId,
    Username: username,
    SecretHash: secretHash,
  });

  try {
    await cognitoClient.send(command);
    return {
      message:
        "Password reset initiated. Please check your email or phone for the code.",
    };
  } catch (error: any) {
    console.error("Error initiating password reset:", error);
    throw new Error(`Failed to initiate password reset: ${error.message}`);
  }
};

export const confirmPasswordReset = async (
  username: string,
  newPassword: string,
  confirmationCode: string,
) => {
  const secretHash = generateSecretHash(username);

  const command = new ConfirmForgotPasswordCommand({
    ClientId: configs.awsCognitoClientId,
    Username: username,
    Password: newPassword,
    ConfirmationCode: confirmationCode,
    SecretHash: secretHash,
  });

  try {
    await cognitoClient.send(command);
    return { message: "Password reset successfully." };
  } catch (error: any) {
    console.error("Error confirming password reset:", error);
    throw new Error(`Failed to reset password: ${error.message}`);
  }
};

