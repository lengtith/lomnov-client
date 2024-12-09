// ===================================================
import { IncomingMessage, ServerResponse } from "http";
import {  Options } from "http-proxy-middleware";

// ====================================================

// routes-def.ts
export interface RouteConfig {
  path: string;
  target?: string;
  methods?: {
    [method: string]: {
      authRequired: boolean;
      roles: string[];
    };
  };
  nestedRoutes?: RouteConfig[];
}

export interface RoutesConfig {
  [route: string]: RouteConfig;
}



// proxy.ts
export interface ProxyConfig {
  [context: string]: Options<IncomingMessage, ServerResponse>;
}


// authenticationToken.ts
export interface User {
  username: string;
  roles: string[]; // Change here to match the expected type
}
