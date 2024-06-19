import { Router } from "express";
import { filesController } from "./files.controller";

export const filesRouter = Router();

filesRouter.get("/", filesController.getFilesList);
filesRouter.get("/:fileId", filesController.getFileDetails);
