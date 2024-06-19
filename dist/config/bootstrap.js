import express from "express";
import cors from "cors";
import { router } from "../modules/router";
import { env } from "./env";
import session from "express-session";
import { logger } from "../modules/logger/logger-middleware";
import { Logger } from "../modules/logger/logger";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days
export function bootstrap() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.text());
    // app.use(express.);
    app.use(cors({
        credentials: true,
        origin: env.WEB_URL,
    }));
    app.use(session({
        secret: env.SESSION_SECRET,
        resave: false,
        cookie: {
            maxAge: COOKIE_MAX_AGE,
        },
        saveUninitialized: true,
    }));
    app.use(logger);
    app.use(router);
    app.listen(env.PORT, () => {
        Logger.info(`Server is running on port http://localhost:${env.PORT}`);
    });
}
