import { route } from "../../common/error-handling/route";
import { filesService } from "./files.service";
import { HTTP_RESPONSES } from "../../common/response/http-codes";
import { HttpError } from "../../common/error-handling/errors";

export const filesController = {
  getFilesList: route(async ({ req }) => {
    const search = filesService.getQuery(req.query.search);

    const files = await filesService.getFiles(search);

    return {
      success: true,
      data: files,
    };
  }),

  getFileDetails: route(async ({ req }) => {
    const fileId = req.params.fileId;

    if (!fileId) throw new HttpError(HTTP_RESPONSES.BAD_REQUEST);

    const file = await filesService.getFile(fileId);

    return {
      success: true,
      data: file,
    };
  }),
};
