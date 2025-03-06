#!/usr/bin/env node

import { run, get, close, open } from "./sqlite3-wrapper.js";

const db = await open(":memory:");
await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

try {
  const result = await run(db, "INSERT INTO books (id, title) VALUES (?, ?)", [
    "a",
    "book title",
  ]);
  console.log(`id: ${result.lastID}`);
} catch (error) {
  if (error instanceof Error && error.code === "SQLITE_MISMATCH") {
    console.error(error.message);
  } else {
    throw error;
  }
}

try {
  const row = await get(db, "SELECT ids, title FROM books");
  console.log(`id: ${row.id}, title: ${row.title}`);
} catch (error) {
  if (error instanceof Error && error.code === "SQLITE_ERROR") {
    console.error(error.message);
  } else {
    throw error;
  }
}

await run(db, "DROP TABLE books");

await close(db);
