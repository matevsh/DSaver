import multer from "multer";
import * as path from "path";
import * as crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "temp/");
  },
  filename: function (_req, file, cb) {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
