#!/usr/bin/env node

import { run, get, close, open } from "./sqlite3-wrapper.js";

const databaseName = "memory";
var db = null;

(async function () {
  db = await open(databaseName);

  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    await run(db, "INSERT INTO books (id, title) VALUES (?, ?)", [
      "a",
      "book title",
    ]);
  } catch (error) {
    if (error.code === "SQLITE_MISMATCH") {
      console.error(error.message);
    }
  }

  try {
    await get(db, "SELECT ids, title FROM books");
  } catch (error) {
    if (error.code === "SQLITE_ERROR") {
      console.error(error.message);
    }
  }

  await run(db, "DROP TABLE books");

  await close(db);
})();
