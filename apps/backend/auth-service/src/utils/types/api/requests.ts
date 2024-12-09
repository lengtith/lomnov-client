export interface RequestSignUpDTO {
  // firstName: string;
  // lastName: string;
  email: string;
  username: string;
  password: string;
  role?: string;
}

export interface RequestVerifyDTO {
  email: string;
  code: string;
}

export interface RequestSignInDTO {
  email: string;
  password: string;
}

// cognito service
export interface RequestSignUpUserDTO {
  email: string;
  password: string;
  username: string;
  role?: string;
}

export interface SignInUserRequest {
  username: string;
  password: string;
}

export interface RequestInitiatePasswordResetDTO {
  email: string;
}

export interface RequestConfirmPasswordResetDTO {
  email: string;
  newPassword: string;
  confirmationCode: string;
}

export interface RequestchangePasswordDTO {
  previousPassword: string;
  proposedPassword: string;
}

export interface JwtPayload {
  sub: string | undefined;
  // add other properties if needed
}
export interface IRefreshTokenRequestDTO{
  username?:string;
  refreshToken?:string;
}