#!/usr/bin/env node

import {
  openDatabase,
  createTable,
  insertRow,
  selectRow,
  dropTable,
  closeDatabase,
} from "./promise-common.js";

var db = null;

main();

function main() {
  openDatabase()
    .then((database) => {
      db = database;
      return createTable(db);
    })
    .then(() =>
      insertRow(db, "INSERT INTO books (title) VALUES (?)", ["book title"]),
    )
    .then((result) => {
      console.log(`id: ${result.lastID}`);
      return selectRow(db, "SELECT id, title FROM books");
    })
    .then((row) => {
      console.log("id: " + row.id + ", title: " + row.title);
      return dropTable(db);
    })
    .then(() => closeDatabase);
}
