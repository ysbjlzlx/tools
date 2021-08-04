import Dexie from "dexie";

const db = new Dexie("tools");
db.version(1).stores({
  json: "++id, content, createdAt",
});

export default db;
