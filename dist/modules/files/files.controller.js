import { route } from "../../common/error-handling/route";
import { filesService } from "./files.service";
export const filesController = {
    getFilesList: route(async ({ req }) => {
        const search = filesService.getQuery(req.query.search);
        const files = await filesService.getFiles(search);
        return {
            success: true,
            data: files,
        };
    }),
};
