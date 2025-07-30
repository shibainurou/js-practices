import sqlite3 from "sqlite3";

export class Database {
  open() {
    return new Promise((resolve, reject) => {
      this.database = new sqlite3.Database("MemoApp.db", function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.database.run(
        "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL)",
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }

  run(sql, params) {
    return new Promise((resolve, reject) => {
      this.database.all(sql, params, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.database.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
