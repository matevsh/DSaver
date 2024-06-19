import multer from "multer";
import * as path from "path";
import * as crypto from "crypto";
import { FILE_SIZE_LIMIT } from "./config";
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "temp/");
    },
    filename: function (_req, file, cb) {
        cb(null, crypto.randomUUID() + path.extname(file.originalname));
    },
});
export const upload = multer({
    storage,
    limits: {
        fileSize: FILE_SIZE_LIMIT,
    },
});
