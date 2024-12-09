import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import configs from "@/src/config";
import { User } from "@/src/utils/types/interface";
import { UnauthorizedError } from "../utils/error/customErrors";

// Extend the Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: User; // Update the Request interface
    }
  }
}

declare module 'express' {
  export interface Request {
    routeConfig?: any; // Use the appropriate type for `routeConfig` instead of `any`
  }
}

const verifier = CognitoJwtVerifier.create({
  tokenUse: "access",
  userPoolId: configs.awsCognitoUserPoolId,
  clientId: configs.awsCognitoClientId,
});

const authenticateToken = async (req: Request, _res: Response, next: NextFunction) => {
  const { routeConfig } = req;
  if (routeConfig && routeConfig.methods && !routeConfig.methods[req.method]?.authRequired) {
    return next();
  }
  const token = req.cookies?.["accessToken"];
  // console.log('req cookie:: ', req.cookies)
  // console.log('token:: ',token)
  if (!token) {
    return next(new UnauthorizedError());
  }

  try {
    const payload = await verifier.verify(token);
    // console.log('payload:: ', payload)
    if (!payload || typeof payload.username !== "string") {
      return next(new UnauthorizedError("Invalid token payload."));
    }
    req.user = {
      username: payload.username, roles: payload["cognito:groups"] || [], // Ensure roles is always an array
    };
    // console.log('user:: ',req.user)
    next();
  } catch (error: any) {
    return next(new UnauthorizedError("Authentication failed."));
  }
};

export default authenticateToken;
