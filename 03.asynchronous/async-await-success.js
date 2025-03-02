#!/usr/bin/env node

import { run, get, close, open } from "./sqlite3-wrapper.js";

const databaseName = "memory";

const db = await open(databaseName);

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
  "book title",
]);
console.log(`id: ${result.lastID}`);

const row = await get(db, "SELECT id, title FROM books");
console.log(`id: ${row.id}, title: ${row.title}`);

await run(db, "DROP TABLE books");

await close(db);
