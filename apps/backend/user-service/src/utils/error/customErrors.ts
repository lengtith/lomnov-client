import { StatusCodes } from "@/src/utils/constands/satusCodes";

export class AppError extends Error {
  public status : number;
  constructor(message: string, status: number){
    super(message);
    this.status = status
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed") {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(message, StatusCodes.CONFLICT);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

