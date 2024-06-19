import { Router } from "express";
import { decodeController } from "./decode.controller";
export const decodeRouter = Router();
decodeRouter.get("/decode", decodeController.decodeFile);
