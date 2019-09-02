import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { log } from "./logs/run_log";

// --> config for dotenv
dotenv.config();

import PeopleRouter from "./routes/people";
import RegRouter from "./routes/registration";
import KeyRouter from "./routes/key";

const app: Application = express();

// --> middleware
app.use(express.json());

// --> routes
app.use("/api/v1/people", PeopleRouter);
app.use("/api/v1/register", RegRouter);
app.use("/api/v1/getkey", KeyRouter);

/**************
  --> Server listening to port 5000 by default in dev
*************/
app.listen(process.env.PORT, () => {
  log(`server started`, "app");
});
