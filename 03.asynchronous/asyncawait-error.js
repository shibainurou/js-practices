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

  try {
    await new Promise((resolve, reject) => {
      run(
        db,
        "INSERT INTO books (id, title) VALUES (?, ?)",
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this);
          }
        },
        ["a", "book title"],
      );
    });
  } catch (err) {
    if (err.code === "SQLITE_MISMATCH") {
      console.error(err.message);
    }
  }

  try {
    await new Promise((resolve, reject) => {
      get(db, "SELECT ids, title FROM books", (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(err.message);
    }
  }

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
