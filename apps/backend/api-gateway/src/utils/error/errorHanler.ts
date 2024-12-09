import { Request, Response, NextFunction } from "express";
import { AppError } from "@/src/utils/error/customErrors";
import { StatusCodes } from "@/src/utils/constands/satusCodes";
// ========================================


export function errorHandler (err: AppError | Error, _req: Request, res: Response, _next: NextFunction) :void{
  const status = err instanceof AppError ? err.status  : StatusCodes.INTERNAL_SERVER_ERROR;
  const error_message = err.message || err;
  res.status(status).json({status, error_message})

}
