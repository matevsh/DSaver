import { Request, Response } from "express";
import { handleError } from "./handle-error";
import { response, ResponseInput } from "../response/create-response";
import {
  getSessionHandlers,
  SessionHandlers,
} from "../session/session-handlers";

type Handler<T> = (args: {
  req: Request;
  res: Response;
  session: SessionHandlers;
}) => ResponseInput<T> | Promise<ResponseInput<T>>;

export function route<T extends object>(handler: Handler<T>) {
  return async (req: Request, res: Response) => {
    const session = getSessionHandlers(req);

    try {
      const controllerResponse = await handler({ req, res, session });
      return response(res, controllerResponse);
    } catch (e) {
      handleError(res, e);
    }
  };
}
