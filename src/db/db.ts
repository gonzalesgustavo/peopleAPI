import mysql from "mysql";
import dotenv from "dotenv";
import { log } from "../logs/run_log";
dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "peopleapi"
});

db.connect(err => {
  if (err) throw err;

  log("Database Connected", "db.ts");
});

export default db;
