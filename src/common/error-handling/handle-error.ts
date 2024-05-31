import { Response } from "express";
import { response } from "../response/create-response";

export function handleError(res: Response, e: unknown) {
  if (e instanceof Error) {
    return response(res, {
      success: false,
      message: e.message,
    });
  }

  return response(res, false);
}
