import { HTTP_RESPONSES } from "./http-codes";
function isContainsBody(response) {
    return response.data !== undefined;
}
export function response(expressRes, response) {
    try {
        const httpResponse = response.success
            ? HTTP_RESPONSES.OK
            : HTTP_RESPONSES.INTERNAL_SERVER_ERROR;
        const serverResponse = {
            success: response.success || httpResponse.success,
            message: response?.message || httpResponse.message,
        };
        if (isContainsBody(response) && response.data) {
            serverResponse.data = response.data;
        }
        return expressRes.status(httpResponse.code).json(serverResponse);
    }
    catch (e) {
        console.error("Error on response", e);
    }
}
