#!/usr/bin/env node

import { open, run, get, close } from "./sqlite3-wrapper.js";

const database = await open(":memory:");

await run(
  database,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const result = await run(database, "INSERT INTO books (title) VALUES (?)", [
  "book title",
]);
console.log(`id: ${result.lastID}`);

const row = await get(database, "SELECT id, title FROM books");
console.log(`id: ${row.id}, title: ${row.title}`);

await run(database, "DROP TABLE books");

await close(database);
