#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { run, get, close } from "./common.js";
var db = null;

(function () {
  new Promise((resolve, reject) => {
    const database = new sqlite3.Database(":memory:", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(database);
      }
    });
  })
    .then((database) => {
      db = database;
      return run(
        db,
        "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      );
    })
    .then(() => {
      return run(db, "INSERT INTO books (title) VALUES (?)", ["book title"]);
    })
    .then((result) => {
      console.log(`id: ${result.lastID}`);
      return get(db, "SELECT id, title FROM books");
    })
    .then((row) => {
      console.log("id: " + row.id + ", title: " + row.title);
      return run(db, "DROP TABLE books");
    })
    .then(() => {
      return close(db);
    });
})();
