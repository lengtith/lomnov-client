import { StatusCodes } from "@/src/utils/constands/satusCodes";

export class AppError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
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

// 1. BadRequestError: Used for general bad request errors.
export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request") {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

// 2. NotImplementedError: Used when a requested method or feature is not implemented.
export class NotImplementedError extends AppError {
  constructor(message: string = "Not Implemented") {
    super(message, StatusCodes.NOT_IMPLEMENTED);
  }
}

// 3. ServiceUnavailableError: Used when the service is temporarily unavailable.
export class ServiceUnavailableError extends AppError {
  constructor(message: string = "Service Unavailable") {
    super(message, StatusCodes.SERVICE_UNAVAILABLE);
  }
}

// 4. TooManyRequestsError: Used when a user exceeds a request limit.
export class TooManyRequestsError extends AppError {
  constructor(message: string = "Too Many Requests") {
    super(message, StatusCodes.TOO_MANY_REQUESTS);
  }
}

// 5. PaymentRequiredError: Used when payment is required for a resource.
export class PaymentRequiredError extends AppError {
  constructor(message: string = "Payment Required") {
    super(message, StatusCodes.PAYMENT_REQUIRED);
  }
}

// 6. GoneError: Used when a resource is no longer available.
export class GoneError extends AppError {
  constructor(message: string = "Resource Gone") {
    super(message, StatusCodes.GONE);
  }
}

// 7. UnsupportedMediaTypeError: Used when the media type is unsupported.
export class UnsupportedMediaTypeError extends AppError {
  constructor(message: string = "Unsupported Media Type") {
    super(message, StatusCodes.UNSUPPORTED_MEDIA_TYPE);
  }
}

// 8. PreconditionFailedError: Used when a precondition for the request fails.
export class PreconditionFailedError extends AppError {
  constructor(message: string = "Precondition Failed") {
    super(message, StatusCodes.PRECONDITION_FAILED);
  }
}

// 9. UnprocessableEntityError: Used when the request cannot be processed.
export class UnprocessableEntityError extends AppError {
  constructor(message: string = "Unprocessable Entity") {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}

// 12. RequestTimeoutError: Used when the server times out waiting for the request.
export class RequestTimeoutError extends AppError {
  constructor(message: string = "Request Timeout") {
    super(message, StatusCodes.REQUEST_TIMEOUT);
  }
}

// 15. MethodNotAllowedError: Used when the HTTP method is not allowed for the requested resource.
export class MethodNotAllowedError extends AppError {
  constructor(message: string = "Method Not Allowed") {
    super(message, StatusCodes.METHOD_NOT_ALLOWED);
  }
}

// 16. LengthRequiredError: Used when a request with a `Content-Length` header is required but not provided.
export class LengthRequiredError extends AppError {
  constructor(message: string = "Length Required") {
    super(message, StatusCodes.LENGTH_REQUIRED);
  }
}

// 17. NotAcceptableError: Used when the server cannot produce a response matching the list of acceptable values defined in the request headers.
export class NotAcceptableError extends AppError {
  constructor(message: string = "Not Acceptable") {
    super(message, StatusCodes.NOT_ACCEPTABLE);
  }
}

// 18. ProxyAuthenticationRequiredError: Used when the client must first authenticate itself with the proxy.
export class ProxyAuthenticationRequiredError extends AppError {
  constructor(message: string = "Proxy Authentication Required") {
    super(message, StatusCodes.PROXY_AUTHENTICATION_REQUIRED);
  }
}

// 19. RequestEntityTooLargeError: Used when the request entity is larger than the server is willing or able to process.
export class RequestEntityTooLargeError extends AppError {
  constructor(message: string = "Request Entity Too Large") {
    super(message, StatusCodes.PAYLOAD_TOO_LARGE);
  }
}

// 21. RangeNotSatisfiableError: Used when the server cannot supply the requested portion of a file.
export class RangeNotSatisfiableError extends AppError {
  constructor(message: string = "Range Not Satisfiable") {
    super(message, StatusCodes.RANGE_NOT_SATISFIABLE);
  }
}

// 22. ExpectationFailedError: Used when the server cannot meet the requirements of the Expect request-header field.
export class ExpectationFailedError extends AppError {
  constructor(message: string = "Expectation Failed") {
    super(message, StatusCodes.EXPECTATION_FAILED);
  }
}

// 23. ImATeapotError: Used as an April Fools' joke, typically not used in production.
export class ImATeapotError extends AppError {
  constructor(message: string = "I'm a teapot") {
    super(message, StatusCodes.I_AM_A_TEAPOT);
  }
}

// 24. MisdirectedRequestError: Used when the request was directed to a server that is not able to produce a response.
export class MisdirectedRequestError extends AppError {
  constructor(message: string = "Misdirected Request") {
    super(message, StatusCodes.MISDIRECTED_REQUEST);
  }
}

// 25. LockedError: Used when the resource that is being accessed is locked.
export class LockedError extends AppError {
  constructor(message: string = "Locked") {
    super(message, StatusCodes.LOCKED);
  }
}

// 26. FailedDependencyError: Used when a request failed because it depended on another request that failed.
export class FailedDependencyError extends AppError {
  constructor(message: string = "Failed Dependency") {
    super(message, StatusCodes.FAILED_DEPENDENCY);
  }
}

// 27. PreconditionRequiredError: Used when the server requires the request to be conditional.
export class PreconditionRequiredError extends AppError {
  constructor(message: string = "Precondition Required") {
    super(message, StatusCodes.PRECONDITION_REQUIRED);
  }
}

// 28. TooEarlyError: Used when the server is unwilling to risk processing a request that might be replayed.
export class TooEarlyError extends AppError {
  constructor(message: string = "Too Early") {
    super(message, StatusCodes.TOO_EARLY);
  }
}

// 29. UpgradeRequiredError: Used when the client should switch to a different protocol, such as TLS/1.0.
export class UpgradeRequiredError extends AppError {
  constructor(message: string = "Upgrade Required") {
    super(message, StatusCodes.UPGRADE_REQUIRED);
  }
}

// 30. NetworkAuthenticationRequiredError: Used when the client needs to authenticate to gain network access.
export class NetworkAuthenticationRequiredError extends AppError {
  constructor(message: string = "Network Authentication Required") {
    super(message, StatusCodes.NETWORK_AUTHENTICATION_REQUIRED);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
