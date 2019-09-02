import { log } from "./../logs/run_log";
import { User } from "./../module/users.model";
import { Router, Request, Response, NextFunction } from "express";

import db from "../db/db";
import QueryBuilder from "../helpers/QueryBuilder";
import ParamsValidation from "../validation/ParamsValidation";

const RegRouter: Router = Router();

RegRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const validator = new ParamsValidation(req);
    const error = validator.checkRegisterCredentials();
    // --> if error exists in params send 404
    if (error) {
      log(JSON.stringify(error) + " post:register:/", "registration.ts");
      res.status(404).json(error.details);
    }
    // --> create user object of type User
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    // --> attempt to add the user to the database
    const queryString = QueryBuilder.registerUser(user);
    db.query(queryString.qString, (err, result) => {
      if (err) {
        log(JSON.stringify(err) + " post:register:/", "registration.ts");

        // --> if error and the error contains duplicate in the string let the user know
        const regex = /\bDuplicate|\busername|\bemail/g;
        const issue = err.sqlMessage!.match(regex);
        // --> send response to user
        res
          .status(406)
          .json({ error: `Sorry the current ${issue![1]} already exists` });
      }
      log("successful post:register:/", "registration.ts");
      res.status(200).json({ key: queryString.api_key });
    });
  } catch (error) {
    log(JSON.stringify(error) + " post:register:/", "registration.ts");
    res.status(404).json({ message: "something went wrong." });
  }
});

export default RegRouter;
