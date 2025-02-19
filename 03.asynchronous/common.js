export function run(db, query, callback, parames = []) {
  return db.run(query, parames, callback);
}

export function get(db, query, callback) {
  return db.get(query, callback);
}

export function close(db, callback) {
  return db.close(callback);
}
