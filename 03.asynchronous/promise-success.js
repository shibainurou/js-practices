#!/usr/bin/env node

import { run, get, close, open } from "./sqlite3-wrapper.js";

let db;

open(":memory:")
  .then((dbParam) => {
    db = dbParam;
    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", ["book title"]))
  .then((result) => {
    console.log(`id: ${result.lastID}`);
    return get(db, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(`id: ${row.id}, title: ${row.title}`);
    return run(db, "DROP TABLE books");
  })
  .then(() => {
    close(db);
  });
