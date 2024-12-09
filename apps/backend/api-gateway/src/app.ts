import express from "express";
import applyProxy from "@/src/middleware/proxy";
import cookieParser from "cookie-parser";
import routeConfigMiddleware from "@/src/middleware/routeConfigMiddleware";
import authenticateToken from "@/src/middleware/authenticateToken";
import authorizeRole from "@/src/middleware/autherizeRole";
import { errorHandler } from "@/src/utils/error/errorHanler";
import cors from "cors"
import corsOptions from "@/src/utils/corsOptions";

const app = express();

// ===============================
// SECURITIES MIDDLEWARES
// ===============================
app.use(cookieParser() as express.Handler);
app.use(cors(corsOptions));

// ===============================
// CHECKING ROUTE REQUEST
// ===============================
// console.log('sslfjslfjslf');

app.use(routeConfigMiddleware);
// console.log('routes middleware.....');

// ===============================
// AUTHENTICATION & AUTHORIZATION ROLE
// ===============================
app.use(authenticateToken);
// console.log('authorize token.....');
app.use(authorizeRole);
// console.log('authorize roles.....');


//================================
// Proxy Routes
// ===============================
applyProxy(app)


//================================
// GLOBAL ERROR HANDLER
// ===============================
app.use(errorHandler)

export default app
