#!/usr/bin/env node
for (let i = 1; i <= 20; i++) {
  let output = "";
  if (i % 3 === 0) {
    output = "Fizz";
  }
  if (i % 5 === 0) {
    output += "Buzz";
  }

  console.log(output === "" ? i : output);
}
