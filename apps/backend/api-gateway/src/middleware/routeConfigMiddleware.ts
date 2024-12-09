import { Request, Response, NextFunction } from "express";
import ROUTE_PATHS from "@/src/routes-def";
import { NotFoundError } from "@/src/utils/error/customErrors";
import { RouteConfig } from "@/src/utils/types/interface";


const findRouteConfig = (
  path: string,
  routeConfigs: RouteConfig
): RouteConfig | null => {
  // Normalize path and ensure there's a leading slash
  const trimmedPath = path.replace(/\/+$/, ""); // Remove trailing slash, if any

  // STEP 1: Split both the path and routeConfig path into segments
  const requestSegments = trimmedPath.split("/").filter(Boolean); // Split and remove empty segments
  const routeSegments = routeConfigs.path.split("/").filter(Boolean);

  // STEP 2: Check if the number of segments match
  if (routeSegments.length > requestSegments.length) {
    return null; // Path is too short to match this route
  }

  // STEP 3: Match route segments (considering dynamic segments like :productId)
  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
    const requestSegment = requestSegments[i];

    if (routeSegment.startsWith(":")) {
      // Dynamic segment, can be anything, so it matches
      continue;
    }

    if (routeSegment !== requestSegment) {
      return null; // Static segment mismatch
    }
  }

  // STEP 4: If no nested routes, return the current routeConfig
  if (!routeConfigs.nestedRoutes) {
    return routeConfigs;
  }

  // STEP 5: Find the remaining path after matching the base path
  const remainingPath = `/${requestSegments.slice(routeSegments.length).join("/")}`;

  // STEP 6: Check if any nested routes match the remaining path
  for (const nestedRouteConfig of routeConfigs.nestedRoutes) {
    const nestedResult = findRouteConfig(remainingPath, nestedRouteConfig);
    if (nestedResult) {
      return nestedResult;
    }
  }

  // If no nested route matches, return the current routeConfig
  return routeConfigs;
};

// TODO: implement the routeConfigMiddleware function
// Step 1: Find the route config for the requested path
// Step 2: Check if the route config has a method for the requested method
// Step 3: Attach the route configuration and method config to the request object
const routeConfigMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { path, method } = req;
  console.log(method);
  
  // Step 1
  let routeConfig = null;
  for (const key in ROUTE_PATHS) {
    routeConfig = findRouteConfig(path, ROUTE_PATHS[key]);
    console.log('routeConfig', routeConfig)
    if (routeConfig) break;
  }

  if (!routeConfig) {
    return next(new NotFoundError(`Not Found: The requested path ${req.path} does not exist.`));
  }
  
  // Step 2
  const methodConfig = routeConfig.methods?.[method];
  if (!methodConfig) {
    return next(new NotFoundError(`Method Not Allowed: The ${req.method} method is not allowed for ${req.path}.`));
  }

  // Attach the route configuration and method config to the request object
  req.routeConfig = routeConfig;

  next();
}

export default routeConfigMiddleware;
