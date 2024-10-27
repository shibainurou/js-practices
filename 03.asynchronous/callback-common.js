import sqlite3 from "sqlite3";

export class Query {
  constructor(insertRowQuery, selectRowQuery) {
    this.insertRowQuery = insertRowQuery;
    this.selectRowQuery = selectRowQuery;
  }
}

export function main(query) {
  const db = new sqlite3.Database(":memory:", function () {
    onCreatedDatabaseEvent(db, query);
  });
}

function onCreatedDatabaseEvent(db, query) {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);",
    function () {
      onCreatedTableEvent(db, query);
    },
  );
}

function onCreatedTableEvent(db, query) {
  db.run(query.insertRowQuery, "book title", function (err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`id: ${this.lastID}`);
    }
    onInsertedRowEvent(db, query);
  });
}

function onInsertedRowEvent(db, query) {
  db.get(query.selectRowQuery, function (err, row) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`id: ${row.id}, title: ${row.title}`);
    }
    db.run("DROP TABLE books", function () {
      db.close();
    });
  });
}
