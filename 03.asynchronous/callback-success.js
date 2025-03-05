#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", () => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run(
        "INSERT INTO books (title) VALUES (?)",
        ["book title"],
        function () {
          console.log(`id: ${this.lastID}`);
          db.get("SELECT id, title FROM books", (_, row) => {
            console.log(`id: ${row.id}, title: ${row.title}`);
            db.run("DROP TABLE books", () => {
              db.close();
            });
          });
        },
      );
    },
  );
});
