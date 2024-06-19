import { handleError } from "./handle-error";
import { response } from "../response/create-response";
import { getSessionHandlers, } from "../session/session-handlers";
import { Logger } from "../../modules/logger/logger";
export function route(handler) {
    return async (req, res) => {
        const session = getSessionHandlers(req);
        try {
            const controllerResponse = await handler({ req, res, session });
            return controllerResponse && response(res, controllerResponse);
        }
        catch (e) {
            Logger.error(`Error caught on route <${req.method}>: ${req.url}`);
            handleError(res, e);
        }
    };
}
