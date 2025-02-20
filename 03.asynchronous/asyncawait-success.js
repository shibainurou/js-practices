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

  const result = await run(
    db,
    "INSERT INTO books (title) VALUES (?)"["book title"],
  );
  console.log(`id: ${result.lastID}`);

  const row = await get(db, "SELECT id, title FROM books");
  console.log("id: " + row.id + ", title: " + row.title);

  await run(db, "DROP TABLE books");

  await close(db);
})();
