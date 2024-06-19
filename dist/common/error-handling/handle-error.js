import { response } from "../response/create-response";
import { HTTP_RESPONSES } from "../response/http-codes";
import { HttpError } from "./errors";
export function handleError(res, e) {
    if (e instanceof HttpError) {
        return response(res, e.response);
    }
    if (e instanceof Error) {
        return response(res, {
            success: false,
            message: e.message,
        });
    }
    return response(res, HTTP_RESPONSES.INTERNAL_SERVER_ERROR);
}
