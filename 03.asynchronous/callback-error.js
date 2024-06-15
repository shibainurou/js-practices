#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", function () {
  onCreatedDatabaseEvent(db);
});

function onCreatedDatabaseEvent(db) {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
    function () {
      onCreatedTableEvent(db);
    },
  );
}

function onCreatedTableEvent(db) {
  const stmt = db.prepare("INSERT INTO books (id, title) VALUES (?, ?)");
  stmt.run(`a`, `title`, function (err) {
    if (err) {
      console.error(err.message);
    }
    onInsertedRowEvent(db, stmt);
  });
}

function onInsertedRowEvent(db, stmt) {
  stmt.finalize(function () {
    onCommitdEvent(db);
  });
}

function onCommitdEvent(db) {
  db.get("SELECT ids, titles FROM books", function (err) {
    if (err) {
      console.error(err.message);
    }
    db.run("DROP TABLE books", function () {
      db.close();
    });
  });
}
