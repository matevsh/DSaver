import { Response } from "express";
import { HTTP_RESPONSES, HttpResponse } from "./http-codes";

type JsonResponse<T> = {
  success: boolean;
  message?: string;
  httpResponse?: HttpResponse;
  data?: T;
};

// Main reason for do that is had centralized response from server

export function response<T extends object>(
  expressRes: Response,
  response: JsonResponse<T> | boolean
) {
  const isBoolInput = typeof response === "boolean";

  const success = isBoolInput ? response : response.success;

  const httpResponse = success
    ? HTTP_RESPONSES.OK
    : HTTP_RESPONSES.INTERNAL_SERVER_ERROR;

  const message = isBoolInput
    ? httpResponse.message
    : response.message ||
      response.httpResponse?.message ||
      httpResponse.message;

  const serverResponse: JsonResponse<T> = {
    success,
    message,
  };

  if (!isBoolInput && response?.data) {
    serverResponse.data = response.data;
  }

  return expressRes.status(httpResponse.code).json(serverResponse);
}
