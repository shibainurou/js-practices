import sqlite3 from "sqlite3";

export function openDatabase() {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(":memory:", () => {
      resolve(db);
    });
  });
}

export function createTable(db) {
  return run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
}

export function insertRow(db, query, parames = []) {
  return run(db, query, parames);
}

export function selectRow(db, query) {
  return getRecord(db, query);
}

export function dropTable(db) {
  return run(db, "DROP TABLE books");
}

export function closeDatabase(db) {
  return new Promise((resolve) => {
    db.close(() => {
      resolve();
    });
  });
}

function run(db, query, parames = []) {
  return new Promise((resolve, reject) => {
    db.run(query, parames, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function getRecord(db, query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
