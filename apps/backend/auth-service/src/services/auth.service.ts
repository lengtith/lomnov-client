import { Request as ExpressRequest } from "express";
import {
  RequestConfirmPasswordResetDTO,
  ResponseConfirmPasswordResetDTO,
  RequestInitiatePasswordResetDTO,
  ResponseInitiatePasswordReset,
  RequestSignInDTO,
  RequestSignUpDTO,
  RequestVerifyDTO,
  ResponseChangeNewPasswordDTO,
  RequestchangePasswordDTO,
} from "@/src/utils/types/indext";
import axios from "axios";
import configs from "@/src/config";
import setCookie from "@/src/middlewares/cookies";
import { CognitoService } from "@/src/services/cognito.service";
import { ValidationError, UnauthorizedError, ServiceUnavailableError } from "@/src/utils/error/customErrors";
import { GlobalSignOutCommandInput, GlobalSignOutCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string }; // Define the structure of cookies
    }
  }
}
export class AuthService {
  private cognitoService: CognitoService;

  constructor() {
    this.cognitoService = new CognitoService();
  }

  public async authSignUp(
    requestBody: RequestSignUpDTO,
  ): Promise<void> {
    try {
      const { email, username, password, role } = requestBody;
      const data = { email, password, username, role: role || "user" };

      const findUsernameExist = await axios.get(
        `${configs.userServiceUrl}/api/v1/users/username/${username}`,
      );

      if (findUsernameExist.data.usernameExist) {
        throw new ValidationError(" Username already exist");
      }

      await this.cognitoService.signUpUser(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          console.error("User service connection refused:", error.message);
          throw new ServiceUnavailableError("User service is currently unavailable. Please try again later.");
        }
      }
      throw error
    }
  }

  public async authVerify(
    requestBody: RequestVerifyDTO,
  ): Promise<void> {
    const { email, code } = requestBody;
    const data = { email, code };

    try {
      await this.cognitoService.verifyUser(data);
    } catch (error) {
      throw error;
    }
  }

  public async authSignin(
    requestBody: RequestSignInDTO,
    request: ExpressRequest,
  ): Promise<void> {
    const { email, password } = requestBody;
    const data = { email, password };
    try {
      const response = await this.cognitoService.signInUser(data);

      setCookie(request.res!, "accessToken", response.authResult!.AccessToken!);
      setCookie(request.res!, "refreshToken", response.authResult!.RefreshToken!); // 30 days
      setCookie(request.res!, "idToken", response.authResult!.IdToken!); // No maxAge, expires with session
      setCookie(request.res!, "username", response.sub!, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days

    } catch (error) {
      throw error;
    }
  }

  public async authChangePassword(
    request: Express.Request,
    requestBody: RequestchangePasswordDTO,
  ): Promise<ResponseChangeNewPasswordDTO> {
    try {
      const accessToken = request.cookies?.accessToken;
      if (!accessToken) {
        throw new UnauthorizedError();
      }
      const { previousPassword, proposedPassword } = requestBody;
      return await this.cognitoService.changeUserPassword(
        accessToken,
        previousPassword,
        proposedPassword,
      );
    } catch (error) {
      throw error;
    }
  }

  public async authPasswordReset(
    requestBody: RequestInitiatePasswordResetDTO,
  ): Promise<ResponseInitiatePasswordReset> {
    const { email } = requestBody;
    const data = { email };
    try {
      return await this.cognitoService.initiatePasswordReset(data);
    } catch (error) {
      throw error;
    }
  }

  public async authConfirmPassword(
    requestBody: RequestConfirmPasswordResetDTO,
  ): Promise<ResponseConfirmPasswordResetDTO> {
    const { email, newPassword, confirmationCode } = requestBody;
    const data = { email, newPassword, confirmationCode };
    try {
      return await this.cognitoService.confirmPasswordReset(data);
    } catch (error) {
      throw error;
    }
  }
  public async signOutUser(accessToken: string):Promise<GlobalSignOutCommandOutput>{
    const params:GlobalSignOutCommandInput = {
      AccessToken: accessToken,
    }
    try {
      return await this.cognitoService.signout(params);
    } catch (error) {
      throw error;
    }
  }
}
