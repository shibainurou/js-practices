#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { run, get, close } from "./common.js";

var db = null;

(async function () {
  db = await new Promise((resolve, reject) => {
    const database = new sqlite3.Database(":memory:", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(database);
      }
    });
  });

  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    await run(db, "INSERT INTO books (id, title) VALUES (?, ?)", [
      "a",
      "book title",
    ]);
  } catch (err) {
    if (err.code === "SQLITE_MISMATCH") {
      console.error(err.message);
    }
  }

  try {
    await get(db, "SELECT ids, title FROM books");
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(err.message);
    }
  }

  await run(db, "DROP TABLE books");

  await close(db);
})();
