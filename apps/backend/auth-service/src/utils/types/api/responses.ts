export interface APIResponse<T = undefined> {
  message: string;
  data?: T
}

export interface ResponseSignUpUserDTO {
  sub: string;
}

export interface AuthenticationResult {
  AccessToken?: string;
  ExpiresIn?: number;
  IdToken?: string;
  RefreshToken?: string;
  TokenType?: string;
}

export interface ResponseSignInUserDTO {
  authResult?: AuthenticationResult;
  sub: string | undefined;
}

export interface ResponseVerifyUserDTO {
  message: string;
  authResult?: AuthenticationResult;
}

export interface ResponseInitiatePasswordReset {
  message: string;
}

export interface ResponseConfirmPasswordResetDTO {
  message: string;
}

export interface ResponseChangeNewPasswordDTO {
  message: string;
}
export interface IRefreshTokenResponseDTO{
  idToken?:string;
  accessToken?:string;
  message?:string;
}