import { Request, Response, NextFunction } from "express";
import { RouteConfig } from "@/src/utils/types/interface";
import { ForbiddenError, UnauthorizedError } from "@/src/utils/error/customErrors";


// Extend the Express Request interface
declare module "express-serve-static-core" {
  interface Request {
    routeConfig?: RouteConfig;
    user?: {
      roles: string[];
      [key: string]: any; // Additional properties can be added here
    };
  }
}

// Middleware to authorize user roles
const authorizeRole = (req: Request, _res: Response, next: NextFunction) => {
  const { methods } = req.routeConfig || {};
  const { method } = req;
  const methodConfig = methods && methods[method];
  // Skip authorization if authRequired is false
  if (methodConfig && !methodConfig.authRequired) {
    return next(); // Skip authorization, proceed to the next middleware
  }
  // Ensure user is authenticated
  if (!req.user || !req.user.roles) {
    return next(new UnauthorizedError("Unauthorized: Please log in."));
  }
  const userRoles = req.user.roles || [];
  const authorized = methodConfig?.roles?.some((role: any) =>
    userRoles.includes(role),
  );
  // Deny access if user is not authorized
  if (!authorized) {
    return next(new ForbiddenError("Forbidden: You do not have permission to access this resource."));
  }
  next(); // Proceed if authorized
};

export default authorizeRole;
