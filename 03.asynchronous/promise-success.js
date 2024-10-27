#!/usr/bin/env node

import { openDatabase, closeDatabase } from "./promise-common.js";

var db = null;

main();

function main() {
  openDatabase()
    .then((database) => {
      db = database;
      return run(
        db,
        "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      );
    })
    .then(() => run(db, "INSERT INTO books (title) VALUES (?)", ["book title"]))
    .then((result) => {
      console.log(`id: ${result.lastID}`);
      return getRecord(db, "SELECT id, title FROM books");
    })
    .then((row) => {
      console.log("id: " + row.id + ", title: " + row.title);
      return run(db, "DROP TABLE books");
    })
    .then(() => closeDatabase);
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
