import { Router } from "express";
import { channelsRouter } from "./channels/channels.router";

export const discordRouter = Router();

discordRouter.use("/channels", channelsRouter);
