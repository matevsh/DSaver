import { Logger } from "./logger";
export function logger(req, res, next) {
    Logger.request(req.method, req.url);
    next();
}
