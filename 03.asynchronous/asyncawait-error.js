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
  try {
    await insertRow(db, "INSERT INTO books (id, title) VALUES (?, ?)", [
      "a",
      "book title",
    ]);
  } catch (err) {
    if (err.code === "SQLITE_MISMATCH") console.error(err.message);
  }
  try {
    await selectRow(db, "SELECT ids, title FROM books");
  } catch (err) {
    if (err.code === "SQLITE_ERROR") console.error(err.message);
  }
  await dropTable(db);
  await closeDatabase(db);
}
