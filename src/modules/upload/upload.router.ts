import { Router } from "express";
import { uploadController } from "./upload.controller";
import { upload } from "../../config/multer";

export const uploadRouter = Router();

uploadRouter.post(
  "/upload-file",
  upload.single("file"),
  uploadController.uploadFile
);
