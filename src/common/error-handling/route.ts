import { Request, Response } from "express";
import { handleError } from "./handle-error";
import { response, ResponseInput } from "../response/create-response";
import {
  getSessionHandlers,
  SessionHandlers,
} from "../session/session-handlers";
import { Logger } from "../../modules/logger/logger";

type Handler<T extends object> = (args: {
  req: Request;
  res: Response;
  session: SessionHandlers;
}) =>
  | ResponseInput<T>
  | Promise<ResponseInput<T>>
  | undefined
  | Promise<undefined>;

export function route<T extends object | null>(
  handler: Handler<T extends object ? T : object>
) {
  return async (req: Request, res: Response) => {
    const session = getSessionHandlers(req);

    try {
      const controllerResponse = await handler({ req, res, session });
      return controllerResponse && response(res, controllerResponse);
    } catch (e) {
      Logger.error(`Error caught on route <${req.method}>: ${req.url}`);
      handleError(res, e);
    }
  };
}
