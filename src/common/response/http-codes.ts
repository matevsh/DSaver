export const HTTP_RESPONSES = {
  NOT_FOUND: {
    code: 404,
    message: "Not found",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal server error",
  },
  OK: {
    code: 200,
    message: "Ok",
  },
  CREATED: {
    code: 201,
    message: "Created",
  },
} as const;

export type HttpResponse = (typeof HTTP_RESPONSES)[keyof typeof HTTP_RESPONSES];
