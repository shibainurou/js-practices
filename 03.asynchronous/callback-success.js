#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:", function () {
  onCreatedDatabase(db);
});

function onCreatedDatabase(db) {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
    function () {
      onCreatedTableEvent(db);
    },
  );
}

function onCreatedTableEvent(db) {
  const stmt = db.prepare("INSERT INTO books (title) VALUES (?)");
  stmt.run(`book title`, function () {
    console.log("id: " + stmt.lastID);
    onInsertedRowEvent(db, stmt);
  });
}

function onInsertedRowEvent(db, stmt) {
  stmt.finalize(function () {
    onCommitedEvent(db);
  });
}

function onCommitedEvent(db) {
  db.get("SELECT id, title FROM books", function (err, row) {
    console.log("id: " + row.id + ", title: " + row.title);
    onSelectedEvent(db);
  });
}

function onSelectedEvent(db) {
  db.run("DROP TABLE books", function () {
    db.close();
  });
}
