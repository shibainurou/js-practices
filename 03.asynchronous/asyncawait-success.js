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

  const result = await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["book title"],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      },
    );
  });

  console.log(`id: ${result.lastID}`);
  const row = await new Promise((resolve, reject) => {
    db.get("SELECT id, title FROM books", (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

  console.log("id: " + row.id + ", title: " + row.title);
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
