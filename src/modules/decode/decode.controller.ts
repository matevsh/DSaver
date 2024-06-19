import { decodeService } from "./decode.service";
import { route } from "../../common/error-handling/route";
import { HTTP_RESPONSES } from "../../common/response/http-codes";
import { HttpError } from "../../common/error-handling/errors";

export const decodeController = {
  decodeFile: route(async ({ req, res }) => {
    const fileId = req.params.fileId;

    if (!fileId) throw new HttpError(HTTP_RESPONSES.BAD_REQUEST);

    const file = await decodeService.decodeFile(fileId);

    return void res.status(HTTP_RESPONSES.OK.code).download(file);
  }),
};
