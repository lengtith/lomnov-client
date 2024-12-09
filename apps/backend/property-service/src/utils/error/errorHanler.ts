import { Request, Response, NextFunction } from "express";
import { AppError } from "@/src/utils/error/customErrors";
import { StatusCodes } from "@/src/utils/constands/satusCodes";
// ========================================


export function errorHandler (err: AppError | Error, _req: Request, res: Response, _next: NextFunction) :void{
  console.log(err);
  
  const status = err instanceof AppError ? err.status  : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || err;
  res.status(status).json({status, message})

}

// export function errorHandler(err: AppError | Error, _req: Request, res: Response, _next: NextFunction): void {

//   const status = err instanceof AppError ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;
//   const message = err.message || `${err}`;
//   res.status(status).json({ status, message });

// }

// import { Request, Response, NextFunction } from 'express';
// import { AppError } from '@/src/utils/errors/customErrors';
// import { StatusCodes } from '@/src/utils/constands/satusCodes';
// export function errorHandler(err: AppError | Error, _req: Request, res: Response, _next: NextFunction): void {
//   const status = err instanceof AppError ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;
//   const message = err.message || 'Internal Server Error';
//   console.error(`[${new Date().toISOString()}] ${status} - ${message}`);
//   res.status(status).json({ status, message });
// }
