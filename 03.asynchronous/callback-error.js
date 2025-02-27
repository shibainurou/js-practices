#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", function () {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
    function () {
      db.run(
        "INSERT INTO books (id, title) VALUES (?, ?)",
        ["a", "book title"],
        function (err) {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`id: ${this.lastID}`);
          }
          db.get("SELECT ids, title FROM books", function (err, row) {
            if (err) {
              console.error(err.message);
            } else {
              console.log(`id: ${row.id}, title: ${row.title}`);
            }
            db.run("DROP TABLE books", function () {
              db.close();
            });
          });
        },
      );
    },
  );
});
