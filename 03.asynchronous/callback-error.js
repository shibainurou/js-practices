#!/usr/bin/env node

import { main, Query } from "./callback-common.js";

main(
  new Query(
    "INSERT INTO books (id, title) VALUES (?, ?)",
    "SELECT ids, titles FROM books",
  ),
);
