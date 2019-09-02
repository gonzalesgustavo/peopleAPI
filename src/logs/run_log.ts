import { readFileSync, writeFileSync } from "fs";

export const log = (message: string, orginatingFileName: string) => {
  //get current date
  const year = new Date().getFullYear();
  const day = new Date().getDay();
  const month = new Date().getMonth();
  const timeStamp = new Date().getTime();
  let currentLogs = readFileSync(__dirname + "/logs.txt", "utf8");
  let msg = `${currentLogs.replace(
    /\s/g,
    ""
  )}log-${year}/${month}/${day}-timeCreatedAt:${timeStamp}-->MESSAGE:${message}-EMMITEDFROM:${orginatingFileName},`;
  writeFileSync(__dirname + "/logs.txt", msg);
};
