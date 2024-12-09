declare module "express-session" {
  interface Session {
    state?: string;
  }
}

import { Controller, Get, Route, Request, Res, TsoaResponse, Tags } from "tsoa";
import { randomBytes } from "crypto";
import configs from "../config";
import { Request as ExRequest } from "express";
import { CognitoService } from "../services/cognito.service";

@Tags("Social Login")
@Route("api/v1/auth/backup")
export class AuthControllerI extends Controller {
  private cognitoService : CognitoService;
  constructor() {
    super()
    this.cognitoService = new CognitoService()
  }
  @Get("/google-sign-in")
  public async googleSignIn(
    @Request() request: ExRequest,
    @Res() redirect: TsoaResponse<302, void>,
  ): Promise<void> {
    const state = randomBytes(16).toString("hex");
    request.session.state = state; // Store state in session
    console.log(`Generated state: ${state}`);
    const authorizeParams = new URLSearchParams({
      response_type: "code",
      client_id: configs.awsCognitoClientId, // Your Cognito app client ID
      redirect_uri: configs.awsRedirectUri, // Your app's callback URL
      state: state,
      identity_provider: "Google",
      scope: "profile email openid",
    });

    redirect(302, undefined, {
      Location: `${
        configs.awsCognitoDomain
      }/oauth2/authorize?${authorizeParams.toString()}`,
    });
  }

  @Get("/facebook-sign-in")
  public async facebookSignIn(
    @Request() request: ExRequest,
    @Res() redirect: TsoaResponse<302, void>,
  ): Promise<void> {
    try {
      // Generate a random state value
      const state = randomBytes(16).toString("hex");
      request.session.state = state; // Store the state in session securely
      console.log(`Generated state: ${state}`);

      // Construct the URL for Cognito OAuth2 authorization
      const authorizeParams = new URLSearchParams({
        response_type: "code",
        client_id: configs.awsCognitoClientId, // Replace with your Cognito app client ID
        redirect_uri: configs.awsRedirectUri, // Replace with your app's callback URL
        identity_provider: "Facebook",
        scope: "profile email openid",
      });

      // Construct the full redirect URL
      const redirectUrl = `${
        configs.awsCognitoDomain
      }/oauth2/authorize?${authorizeParams.toString()}`;
      console.log(`Redirecting to: ${redirectUrl}`);

      // Redirect the user to the Cognito authorization URL
      redirect(302, undefined, { Location: redirectUrl });
    } catch (error) {
      console.error("Error during Facebook sign-in:", error);
      // You might want to handle the error differently, such as rendering an error page or sending a response.
      throw new Error("Failed to initiate Facebook sign-in");
    }
  }


  @Get("/callback")
  public async callback(
    @Request() request: ExRequest,
    @Res() badRequest: TsoaResponse<400, { error: string; error_description: string }>,
    @Res() redirect: TsoaResponse<302, void>
  ): Promise<void> {
    try {
      const code = request.query.code as string;
      const error = request.query.error as string;

      if (error || !code) {
        return badRequest(400, {
          error: error || "Unknown error",
          error_description: "No authorization code found",
        });
      }

      await this.cognitoService.handleCallback(code, request.res);
      return redirect(302, undefined, { Location: configs.clientUrl });
    } catch (error: any) {
      throw error
    }
  }
}
