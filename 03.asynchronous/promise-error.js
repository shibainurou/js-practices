#!/usr/bin/env node

import { open, run, get, close } from "./sqlite3-wrapper.js";

let database;

open(":memory:")
  .then((databaseParam) => {
    database = databaseParam;
    return run(
      database,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() =>
    run(database, "INSERT INTO books (id, title) VALUES (?, ?)", [
      "a",
      "book title",
    ]),
  )
  .then((result) => {
    console.log(`id: ${result.lastID}`);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .then(() => get(database, "SELECT ids, title FROM books"))
  .then((row) => {
    console.log(`id: ${row.id}, title: ${row.title}`);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .then(() => {
    run(database, "DROP TABLE books");
  })
  .then(() => {
    close(database);
  });
