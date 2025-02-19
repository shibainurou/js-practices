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

  await new Promise((resolve, reject) => {
    run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });

  const result = await new Promise((resolve, reject) => {
    run(
      db,
      "INSERT INTO books (title) VALUES (?)",
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      },
      ["book title"],
    );
  });

  console.log(`id: ${result.lastID}`);
  const row = await new Promise((resolve, reject) => {
    get(db, "SELECT id, title FROM books", (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

  console.log("id: " + row.id + ", title: " + row.title);
  await new Promise((resolve, reject) => {
    run(db, "DROP TABLE books", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  await new Promise((resolve, reject) => {
    close(db, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
})();
