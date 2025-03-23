#!/usr/bin/env node

import { open, run, get, close } from "./sqlite3-wrapper.js";

let database;

open(":memory:")
  .then((opendDatabase) => {
    database = opendDatabase;
    return run(
      database,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() => {
    return run(database, "INSERT INTO books (title) VALUES (?)", [
      "book title",
    ]);
  })
  .then((result) => {
    console.log(`id: ${result.lastID}`);
    return get(database, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(`id: ${row.id}, title: ${row.title}`);
    return run(database, "DROP TABLE books");
  })
  .then(() => {
    return close(database);
  });
