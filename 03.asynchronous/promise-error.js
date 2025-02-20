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
      return run(db, "INSERT INTO books (id, title) VALUES (?, ?)", [
        "a",
        "book title",
      ]);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      return get(db, "SELECT ids, title FROM books");
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      return run(db, "DROP TABLE books");
    })
    .then(() => {
      return close(db);
    });
})();
