import { Router } from "express";
import { channelsController } from "./channels.controller";

export const channelsRouter = Router();

channelsRouter.get("/", channelsController.getUserTextChannels);
