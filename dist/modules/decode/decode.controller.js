import { decodeBodySchema } from "./decode.schema";
import { decodeService } from "./decode.service";
import { route } from "../../common/error-handling/route";
import { HTTP_RESPONSES } from "../../common/response/http-codes";
export const decodeController = {
    decodeFile: route(async ({ req, res }) => {
        const { fileId } = decodeBodySchema.parse(req.body);
        const file = await decodeService.decodeFile(fileId);
        return void res.status(HTTP_RESPONSES.OK.code).download(file);
    }),
};
