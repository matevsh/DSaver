import { HTTP_RESPONSES } from "../common/response/http-codes";
import { response } from "../common/response/create-response";
export function authGuard(req, res, next) {
    if (!req.session.user) {
        return response(res, HTTP_RESPONSES.UNAUTHORIZED);
    }
    next();
}
