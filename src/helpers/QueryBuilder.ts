import { User } from "./../module/users.model";
import Person from "../module/persons.model";
const uuidv1 = require("uuid/v1");
import bcrypt from "bcryptjs";

interface RegistrationInterface {
  qString: string;
  api_key: string;
}

const QueryBuilder = {
  getAll: "SELECT * FROM persons",
  getPerson: (id: string): string => {
    return `SELECT * FROM persons WHERE id='${id}';`;
  },
  logUserIn: (username: string): string => {
    return `SELECT * from users WHERE username='${username}';`;
  },
  checkUsers: (key: string): string => {
    return `SELECT api_key FROM users WHERE api_key=${key};`;
  },
  registerUser: (u: User): RegistrationInterface => {
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(u.password, salt);
    let apiKey = uuidv1();
    return {
      qString: `INSERT INTO users 
      (username, email, password, api_key) 
      VALUES('${u.username}', '${u.email}', '${hash}', '${apiKey}'); `,
      api_key: apiKey
    };
  },
  insertPerson: (i: Person): string => {
    return `INSERT INTO persons 
    (first_name, last_name, gender, age, medical_history, marital_status, current_status, bio) 
    VALUES 
    ('${i.first_name}', '${i.last_name}',' ${i.gender}', ${i.age}, '${
      i.medical_hsitory
    }', '${i.marital_status}', '${i.current_status}', '${i.bio}');`;
  }
};

export default QueryBuilder;
