#!/usr/bin/env node

for (let i = 1; i <= 20; i++) {
  let output = "";
  if (i % 3 === 0) {
    output = "Fizz";
  }
  if (i % 5 === 0) {
    output += "Buzz";
  }

  console.log('\x1b[37m%s\x1b[0m', output === "" ? i : output);
}
