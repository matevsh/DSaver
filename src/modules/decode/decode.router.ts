import { Router } from "express";
import { decodeController } from "./decode.controller";

export const decodeRouter = Router();

decodeRouter.get("/decode/:fileId", decodeController.decodeFile);
