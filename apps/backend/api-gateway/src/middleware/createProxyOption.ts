import { Socket } from "net";
import { IncomingMessage, ServerResponse, ClientRequest } from "http";
// import { Options } from "http-proxy-middleware";
import { loggingMiddleware } from "@/src/utils/logger";
import { RouteConfig } from "@/src/utils/types/interface";

const createProxyOptions = (
  routeConfig: RouteConfig,
) => ({
  target: routeConfig.target,
  changeOrigin: true,
  pathRewrite: (path: any, _req: any) => {
    // Extract the dynamic part of the path
    const dynamicPath = path.replace(routeConfig.path, ""); // Remove the base path
    console.log(dynamicPath);
    return `${routeConfig.path}${dynamicPath}`; // Return the full path
  },
  on: {
    proxyReq: (
      _proxyReq: ClientRequest,
      req: IncomingMessage,
      res: ServerResponse,
    ) => {
      const nestedPath = `${routeConfig.target}${req.url}`;
      loggingMiddleware(req, res, nestedPath, "Proxy Request");
    },
    proxyRes: (
      _proxyRes: IncomingMessage,
      req: IncomingMessage,
      res: ServerResponse,
    ) => {
      const nestedPath = `${routeConfig.target}${req.url}`;
      loggingMiddleware(req, res, nestedPath, "Proxy Responsed");
    },
    error: (
      _err: Error,
      _req: IncomingMessage,
      res: ServerResponse | Socket,
    ) => {
      if (res instanceof ServerResponse) {
        res.statusCode = 500;

        res.end("Proxy error");
      } else {
        res.destroy();
      }
    },
  },
});

export default createProxyOptions;
