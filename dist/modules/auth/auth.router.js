import { Router } from "express";
import { authController } from "./auth.controller";
export const authRouter = Router();
authRouter.post("/sign-up", authController.signUp);
authRouter.post("/sign-in", authController.signIn);
authRouter.get("/session", authController.session);
authRouter.get("/logout", authController.logout);
