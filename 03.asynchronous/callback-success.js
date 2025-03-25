#!/usr/bin/env node

import sqlite3 from "sqlite3";

const database = new sqlite3.Database(":memory:", () => {
  database.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      database.run(
        "INSERT INTO books (title) VALUES (?)",
        ["book title"],
        function () {
          console.log(`id: ${this.lastID}`);
          database.get("SELECT id, title FROM books", (_, row) => {
            console.log(`id: ${row.id}, title: ${row.title}`);
            database.run("DROP TABLE books", () => {
              database.close();
            });
          });
        },
      );
    },
  );
});
