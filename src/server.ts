import express, { Router } from "express";
import exp from "node:constants";

const app = express();

const router = Router();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3000);
