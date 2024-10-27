import sqlite3 from "sqlite3";

export function openDatabase() {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(":memory:", () => {
      resolve(db);
    });
  });
}

export function closeDatabase(db) {
  return new Promise((resolve) => {
    db.close(() => {
      resolve();
    });
  });
}
