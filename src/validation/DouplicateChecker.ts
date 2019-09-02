import db from "../db/db";
import QueryBuilder from "../helpers/QueryBuilder";
class DouplicateChecker {
  isNew: boolean = true;
  constructor(public newPerson: string) {}
  validate(found: any) {
    db.query(QueryBuilder.getAll, (err, rows, fields) => {
      for (let person of rows) {
        let name = `${person.first_name.trim()} ${person.last_name.trim()}`;
        if (this.newPerson === name) {
          found(1);
        }
      }
    });
  }
}

export default DouplicateChecker;
