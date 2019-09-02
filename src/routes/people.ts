import { log } from "./../logs/run_log";
import { Router, Request, Response, NextFunction } from "express";

import Person from "../module/persons.model";
import db from "../db/db";
import QueryBuilder from "../helpers/QueryBuilder";
import ParamsValidation from "../validation/ParamsValidation";
import DouplicateChecker from "../validation/DouplicateChecker";

const PeopleRouter: Router = Router();

PeopleRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  let key = req.query.key;
  if (!key) {
    log("user failed to provide key get:/", "people.ts");
    res.status(500).json({ error: "failed" });
  } else {
    db.query(QueryBuilder.checkUsers(key), (err, result) => {
      if (err) {
        log(JSON.stringify(err) + " get:/", "people.ts");
        res.status(500);
      }
      try {
        db.query(QueryBuilder.getAll, (err, rows, fields) => {
          log("successful response get:/", "people.ts");
          res.status(200).json(rows);
        });
      } catch (error) {
        log(JSON.stringify(error) + " get:/", "people.ts");
        res.status(400).json({ msg: error });
      }
    });
  }
});

PeopleRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    let key = req.query.key;
    if (!key) {
      log("user failed to provide key post:person", "people.ts");
      res.status(500).json({ error: "Please provide an api key" });
    } else {
      try {
        // --> validate parameters sent in using Joi
        const validator = new ParamsValidation(req);
        const error = validator.checkPersonsCredentials();
        // --> if error exists in params send 404
        if (error) {
          log(JSON.stringify(error) + "post:person", "people.ts");
          res.status(404).json(error.details);
        }
        // --> check if the name passed in already exists in the database
        const doubleCheck = new DouplicateChecker(
          `${req.body.first_name.trim()} ${req.body.last_name.trim()}`
        );
        // --> callback funciton to check if person was found
        let isValid = (found: number = 0) => {
          if (found === 1) {
            log(
              "user exists in Database-attempted duplicate person post:person",
              "people.ts"
            );

            res
              .status(400)
              .json({ message: "Person Exists in Database Please try again." });
          }
        };
        // --> check if person is valid as a new person
        doubleCheck.validate(isValid);
        // --> prepare person
        const individual = new Person(
          req.body.fName,
          req.body.lName,
          req.body.gender,
          req.body.age,
          req.body.medHis,
          req.body.marStat,
          req.body.curStat,
          req.body.bio
        );
        // --> save person
        db.query(QueryBuilder.insertPerson(individual), (err, result) => {
          if (err) log(JSON.stringify(err) + "post:person", "people.ts");
          log("succesful person added post:person", "people.ts");
          res.status(200).json({ data: result });
        });
      } catch (error) {
        log(JSON.stringify(error) + "post:person", "people.ts");
        res.status(400).send(error);
      }
    }
  }
);

PeopleRouter.get(
  "/person",
  (req: Request, res: Response, next: NextFunction) => {
    let key = req.query.key;
    if (!key) {
      res.status(500).json({ error: "failed" });
      log("key not in params failure get/person", "people.ts");
    } else {
      db.query(QueryBuilder.checkUsers(key), (err, result) => {
        if (err) {
          log(JSON.stringify(err) + "get/person", "people.ts");

          res.status(500);
        }
        if (result.length > 0) {
          try {
            let id: string = req.query.id;
            if (!id) {
              log("id not provided get/person", "people.ts");
              res.status(404).json({ message: "id of recipe required" });
            } else {
              db.query(QueryBuilder.getPerson(id), (err, result) => {
                if (err) {
                  log(JSON.stringify(err) + "get/person", "people.ts");
                  res.status(408).json({ message: "Person was not found" });
                }
                if (result.length <= 0) {
                  log("id not found in database get/person", "people.ts");
                  res.status(404).json({ message: "id not found" });
                }
                log("successful response get/person", "people.ts");
                res.status(200).json({ person: result });
              });
            }
          } catch (error) {
            log(JSON.stringify(error) + "get/person", "people.ts");
            res.status(400).json({ msg: error });
          }
        } else {
          log("person was not found get/person", "people.ts");

          res.status(408).json({ message: "Person was not found" });
        }
      });
    }
  }
);
export default PeopleRouter;
