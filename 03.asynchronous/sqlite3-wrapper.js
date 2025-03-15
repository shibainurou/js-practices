import sqlite3 from "sqlite3";

export function open(databaseName) {
  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(databaseName, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(database);
      }
    });
  });
}

export function run(database, query, params) {
  return new Promise((resolve, reject) => {
    database.run(query, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

export function get(database, query, params) {
  return new Promise((resolve, reject) => {
    database.get(query, params, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

export function close(database) {
  return new Promise((resolve, reject) => {
    database.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
