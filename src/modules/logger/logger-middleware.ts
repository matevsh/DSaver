import { Request, Response, NextFunction } from "express";
import { Logger } from "./logger";

export function logger(req: Request, res: Response, next: NextFunction) {
  Logger.request(req.method, req.url);
  next();
}
