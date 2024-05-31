import { Router } from "express";
import { uploadRouter } from "./upload/upload.router";
import { decodeRouter } from "./decode/decode.router";
import { filesRouter } from "./files/files.router";
import { discordRouter } from "./discord/discord.router";
import { authRouter } from "./auth/auth.router";

export const router = Router();

router.use("/files", filesRouter);
router.use("/discord", discordRouter);
router.use("/auth", authRouter);
router.use(uploadRouter);
router.use(decodeRouter);
