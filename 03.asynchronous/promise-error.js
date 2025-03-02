#!/usr/bin/env node

import { run, get, close, open } from "./sqlite3-wrapper.js";

const databaseName = "memory";
let db;

(function () {
  open(databaseName)
    .then((dbArgs) => {
      db = dbArgs;
      return run(
        db,
        "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      );
    })
    .then(() =>
      run(db, "INSERT INTO books (id, title) VALUES (?, ?)", [
        "a",
        "book title",
      ]),
    )
    .catch((error) => console.error(error.message))
    .then(() => get(db, "SELECT ids, title FROM books"))
    .catch((error) => console.error(error.message))
    .then(() => run(db, "DROP TABLE books"))
    .then(() => close(db));
})();
