#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const DAYS_OF_THE_WEEK = 7;
const DAY_WIDTH = 2;
const MAX_WIDTH = DAYS_OF_THE_WEEK * DAY_WIDTH + (DAYS_OF_THE_WEEK - 1);

function runCalendarApp() {
  const argv = minimist(process.argv.slice(2));
  const currentDate = dayjs();
  const year =
    typeof argv.y === "number" && argv.y !== 0 ? argv.y : currentDate.year();
  const month =
    typeof argv.m === "number" && 1 <= argv.m >= 12
      ? argv.m
      : currentDate.month() + 1;
  displayCalendar(year, month);
}

function displayCalendar(year, month) {
  displayYearAndMonth(year, month);
  displayWeekAndDays(year, month);
}

function displayYearAndMonth(year, month) {
  const title = `${month}月 ${year}`;
  const totalPaddingCount = Math.floor(MAX_WIDTH - title.length);
  const leftPaddingText = " ".repeat(totalPaddingCount / 2);
  console.log(`${leftPaddingText}${title}`);
}

function displayWeekAndDays(year, month) {
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const totalPaddingCount = Math.floor(
    MAX_WIDTH - DAYS_OF_THE_WEEK * DAY_WIDTH,
  );
  const daySpaces = " ".repeat(totalPaddingCount / (DAYS_OF_THE_WEEK - 1));
  const paddedDayOfWeek = dayOfWeek.map((day) => day.padStart(DAY_WIDTH - 1));
  console.log(paddedDayOfWeek.join(daySpaces));

  const firstDate = dayjs(`${year}-${month}-01`);
  const lastDate = firstDate.endOf("month");
  for (let i = 0; i < firstDate.day(); i++) {
    process.stdout.write(" ".repeat(DAY_WIDTH) + daySpaces);
  }
  for (let i = 1; i <= lastDate.date(); i++) {
    let dayString = i.toString().padStart(DAY_WIDTH, " ");
    process.stdout.write(dayString);

    const isWeekend = (firstDate.day() + i) % DAYS_OF_THE_WEEK === 0;
    if (isWeekend || i === lastDate.date()) {
      console.log();
    } else {
      process.stdout.write(daySpaces);
    }
  }
  console.log();
}

runCalendarApp();
