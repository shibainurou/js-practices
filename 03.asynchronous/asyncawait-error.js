#!/usr/bin/env node

import sqlite3 from "sqlite3";

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
    db.run(
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
      db.run(
        "INSERT INTO books (id, title) VALUES (?, ?)",
        ["a", "book title"],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this);
          }
        },
      );
    });
  } catch (err) {
    if (err.code === "SQLITE_MISMATCH") {
      console.error(err.message);
    }
  }

  try {
    await new Promise((resolve, reject) => {
      db.get("SELECT ids, title FROM books", (err, row) => {
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
    db.run("DROP TABLE books", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  await new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
})();
