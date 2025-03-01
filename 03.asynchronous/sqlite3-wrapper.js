import sqlite3 from "sqlite3";

export function open(databaseName) {
  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(`:${databaseName}:`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(database);
      }
    });
  });
}

export function run(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

export function get(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

export function close(db) {
  return new Promise((resolve, reject) => {
    db.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
