#!/usr/bin/env node

import { main, Query } from "./callback-common.js";

main(
  new Query(
    "INSERT INTO books (title) VALUES (?)",
    "SELECT id, title FROM books",
  ),
);
