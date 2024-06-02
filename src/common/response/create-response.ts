import { Response } from "express";
import { HTTP_RESPONSES, HttpResponse } from "./http-codes";

type JsonResponse<T> = {
  success: boolean;
  message?: string;
  httpResponse?: HttpResponse;
  data?: T;
};

// Main reason for do that is had centralized response from server

export type ResponseInput<T> = JsonResponse<T> | HttpResponse;

function isContainsBody<T>(
  response: ResponseInput<T>
): response is JsonResponse<T> {
  return (response as JsonResponse<T>).data !== undefined;
}

export function response<T extends object>(
  expressRes: Response,
  response: ResponseInput<T>
) {
  const httpResponse = response.success
    ? HTTP_RESPONSES.OK
    : HTTP_RESPONSES.INTERNAL_SERVER_ERROR;

  const serverResponse: JsonResponse<T> = {
    success: response.success || httpResponse.success,
    message: response?.message || httpResponse.message,
  };

  if (isContainsBody(response) && response.data) {
    serverResponse.data = response.data;
  }

  return expressRes.status(httpResponse.code).json(serverResponse);
}
