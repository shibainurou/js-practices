#!/usr/bin/env node

import sqlite3 from "sqlite3";

var db = null;

(function () {
  new Promise((resolve, reject) => {
    const database = new sqlite3.Database(":memory:", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(database);
      }
    });
  })
    .then((database) => {
      db = database;
      return new Promise((resolve, reject) => {
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
    })
    .then(() => {
      return new Promise((resolve, reject) => {
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
    })
    .then((result) => {
      console.log(`id: ${result.lastID}`);
      return new Promise((resolve, reject) => {
        db.get("SELECT id, title FROM books", (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    })
    .then((row) => {
      console.log("id: " + row.id + ", title: " + row.title);
      return new Promise((resolve, reject) => {
        db.run("DROP TABLE books", (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        db.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
})();
