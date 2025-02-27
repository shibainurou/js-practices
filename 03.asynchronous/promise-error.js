#!/usr/bin/env node

import { run, get, close, open } from "./sqlite3-wrapper.js";
var db = null;

(function () {
  open()
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
