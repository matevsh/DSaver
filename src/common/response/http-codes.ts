export const HTTP_RESPONSES = {
  NOT_FOUND: {
    success: false,
    code: 404,
    message: "Not found",
  },
  BAD_REQUEST: {
    success: false,
    code: 400,
    message: "Bad request",
  },
  INVALID_CREDENTIALS: {
    success: false,
    code: 400,
    message: "Invalid credentials",
  },
  INVALID_INVITATION_CODE: {
    success: false,
    code: 400,
    message: "Invalid invitation code",
  },
  UNAUTHORIZED: {
    success: false,
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    success: false,
    code: 403,
    message: "Forbidden",
  },
  LOGIN_NOT_UNIQUE: {
    success: false,
    code: 409,
    message: "Same login already exists",
  },
  INTERNAL_SERVER_ERROR: {
    success: false,
    code: 500,
    message: "Internal server error",
  },
  OK: {
    success: true,
    code: 200,
    message: "Ok",
  },
  CREATED: {
    success: true,
    code: 201,
    message: "Created",
  },
} as const;

export type HttpResponse = (typeof HTTP_RESPONSES)[keyof typeof HTTP_RESPONSES];
