import { Router } from "express";
import { uploadRouter } from "./upload/upload.router";
import { decodeRouter } from "./decode/decode.router";
import { filesRouter } from "./files/files.router";
import { discordRouter } from "./discord/discord.router";
import { authRouter } from "./auth/auth.router";
import { authGuard } from "../guards/auth-guard";

export const router = Router();

router.use("/files", authGuard, filesRouter);
router.use("/discord", authGuard, discordRouter);
router.use("/auth", authRouter);
router.use(authGuard, uploadRouter);
router.use(authGuard, decodeRouter);
