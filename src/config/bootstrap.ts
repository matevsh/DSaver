import express from "express";
import cors from "cors";
import { router } from "../modules/router";
import { env } from "./env";
import session from "express-session";

export function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.text());
  // app.use(express.);

  app.use(
    cors({
      credentials: true,
      origin: env.WEB_URL,
    })
  );

  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(router);

  app.listen(env.PORT, () => {
    console.log(`Server is running on port http://localhost:${env.PORT}`);
  });
}
