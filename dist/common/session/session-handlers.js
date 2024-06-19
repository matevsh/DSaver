import { HttpError } from "../error-handling/errors";
import { HTTP_RESPONSES } from "../response/http-codes";
export function getSessionHandlers(req) {
    function get() {
        return req.session.user;
    }
    function getOrThrow() {
        const user = get();
        if (!user) {
            throw new HttpError(HTTP_RESPONSES.UNAUTHORIZED);
        }
        return user;
    }
    function set(user) {
        req.session.user = user;
    }
    function destroy() {
        req.session.user = undefined;
    }
    return {
        get,
        getOrThrow,
        set,
        destroy,
    };
}
