#!/usr/bin/env node

import {
  openDatabase,
  createTable,
  insertRow,
  selectRow,
  dropTable,
  closeDatabase,
} from "./promise-common.js";

main();

async function main() {
  const db = await openDatabase();
  await createTable(db);
  const result = await insertRow(db, "INSERT INTO books (title) VALUES (?)", [
    "book title",
  ]);
  console.log(`id: ${result.lastID}`);
  const row = await selectRow(db, "SELECT id, title FROM books");
  console.log(`id: ${row.id}, title: ${row.title}`);
  await dropTable(db);
  await closeDatabase(db);
}
