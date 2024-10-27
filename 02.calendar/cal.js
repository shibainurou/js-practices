#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

function runCalendar() {
  const argv = minimist(process.argv.slice(2));
  const currentDate = dayjs();
  const year = parseInt(argv.y) || currentDate.year();
  const month = parseInt(argv.m) || currentDate.month() + 1;
  display(year, month);
}

function display(year, month) {
  const DAYS_OF_THE_WEEK = 7;
  const DAY_WIDTH = 2;
  const MAX_WIDTH = DAYS_OF_THE_WEEK * DAY_WIDTH + (DAYS_OF_THE_WEEK - 1);
  displayYearAndMonth(year, month, MAX_WIDTH);
  displayWeekAndDays(year, month, MAX_WIDTH, DAY_WIDTH, DAYS_OF_THE_WEEK);
}

function displayYearAndMonth(year, month, maxWidth) {
  const title = `${month}月 ${year}`;
  const allSpaces = Math.floor(maxWidth - title.length);
  const halfSpaces = " ".repeat(allSpaces / 2);
  console.log(`${halfSpaces}${title}`);
}

function displayWeekAndDays(year, month, maxWidth, dayWidth, daysOfTheWeek) {
  const weekTitle = ["日", "月", "火", "水", "木", "金", "土"];
  const allSpaces = Math.floor(maxWidth - daysOfTheWeek * dayWidth);
  const daySpaces = " ".repeat(allSpaces / (daysOfTheWeek - 1));
  const paddedWeekTitle = weekTitle.map((day) => day.padStart(dayWidth - 1));
  console.log(paddedWeekTitle.join(daySpaces));

  const firstDate = dayjs(`${year}-${month}-01`);
  const lastDate = firstDate.endOf("month");
  for (let i = 0; i < firstDate.day(); i++) {
    process.stdout.write(" ".repeat(dayWidth) + daySpaces);
  }
  for (let i = 1; i <= lastDate.date(); i++) {
    let dayString = i.toString().padStart(dayWidth, " ");
    process.stdout.write(dayString);

    const isWeekend = (firstDate.day() + i) % daysOfTheWeek === 0;
    if (isWeekend || i === lastDate.date()) {
      console.log();
    } else {
      process.stdout.write(daySpaces);
    }
  }
  console.log();
}

runCalendar();
