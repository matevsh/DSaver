import { Request, Response } from "express";
import { handleError } from "./handle-error";

type Handler = (req: Request, res: Response) => void | Promise<void>;

export function route(handler: Handler) {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (e) {
      handleError(res, e);
    }
  };
}
