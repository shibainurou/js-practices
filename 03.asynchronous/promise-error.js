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
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        db.get("SELECT ids, title FROM books", (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      }).catch((err) => {
        console.error(err.message);
      });
    })
    .then(() => {
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
