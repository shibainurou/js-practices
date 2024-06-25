#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

function runCalendar() {
  const argv = minimist(process.argv.slice(2));
  const year = parseInt(argv.y) || dayjs().year();
  const month = parseInt(argv.m) || dayjs().month() + 1;
  display(year, month);
}

function display(year, month) {
  const NUMBER_OF_WEEKS = 7;
  const DAY_WIDTH = 2;
  const MAX_WIDTH = NUMBER_OF_WEEKS * DAY_WIDTH + (NUMBER_OF_WEEKS - 1);
  displayYearAndMonth(year, month, MAX_WIDTH);
  displayWeekAndDays(year, month, MAX_WIDTH, DAY_WIDTH, NUMBER_OF_WEEKS);
}

function displayYearAndMonth(year, month, maxWidth) {
  const title = `${month}月 ${year}`;
  const allSpaces = Math.floor(maxWidth - title.length);
  const halfSpaces = " ".repeat(allSpaces / 2);
  console.log(halfSpaces + title);
}

function displayWeekAndDays(year, month, maxWidth, dayWidth, numberOfWeeks) {
  const weekTitle = ["日", "月", "火", "水", "木", "金", "土"];
  const allSpaces = Math.floor(maxWidth - numberOfWeeks * dayWidth);
  const daySpaces = " ".repeat(allSpaces / (numberOfWeeks - 1));
  const paddedWeekTitle = weekTitle.map((day) => day.padStart(dayWidth - 1));
  console.log(paddedWeekTitle.join(daySpaces));

  const firstDate = dayjs(`${year}-${month}-01`);
  const firstDayOfWeek = firstDate.day();
  const lastDay = firstDate.endOf("month").date();

  for (let i = 0; i < firstDayOfWeek; i++) {
    process.stdout.write(" ".repeat(dayWidth) + daySpaces);
  }
  for (let i = 1; i <= lastDay; i++) {
    let dayString = i.toString().padStart(dayWidth, " ");
    process.stdout.write(dayString);
    if ((firstDayOfWeek + i) % numberOfWeeks !== 0) {
      process.stdout.write(daySpaces);
    } else {
      console.log("");
    }
  }
  console.log("");
}

runCalendar();
