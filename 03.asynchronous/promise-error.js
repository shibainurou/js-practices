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
      insertRow(db, "INSERT INTO books (id, title) VALUES (?, ?)", [
        "a",
        "book title",
      ]),
    )
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      return selectRow(db, "SELECT ids, title FROM books");
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      return dropTable(db);
    })
    .then(() => closeDatabase);
}
