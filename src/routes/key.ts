import { log } from "./../logs/run_log";
import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import db from "../db/db";
import QueryBuilder from "../helpers/QueryBuilder";
import ParamsValidation from "../validation/ParamsValidation";

const KeyRouter: Router = Router();

KeyRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  const validateParams = new ParamsValidation(req);
  const error = validateParams.checkLoginCredentials();
  if (error) {
    log(JSON.stringify(error) + " getkey:/", "key.ts");
    res.status(404).json(error.details);
  }
  db.query(QueryBuilder.logUserIn(req.body.username), (err, results) => {
    if (err) {
      log(JSON.stringify(err) + " getkey:/", "key.ts");
      res.status(406).json({ error: "Something went wrong..." });
    }
    const validated = bcrypt.compareSync(
      req.body.password,
      results[0].password
    );
    if (validated) {
      log("success getkey:/", "key.ts");
      res.status(200).json({ api_key: results[0].api_key });
    } else {
      log("failed getkey:/", "key.ts");
      res.status(404).json("Could not validate you");
    }
  });
});

export default KeyRouter;
