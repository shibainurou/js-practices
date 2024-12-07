#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const DAYS_OF_THE_WEEK = 7;
const DAY_WIDTH = 2;
const MAX_WIDTH = 20;

function runCalendarApp() {
  const argv = minimist(process.argv.slice(2));
  const currentDate = dayjs();
  const year =
    typeof argv.y === "number" && 1 <= argv.y && argv.y <= 9999
      ? argv.y
      : currentDate.year();
  const month =
    typeof argv.m === "number" && 1 <= argv.m && argv.m <= 12
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
  console.log("日 月 火 水 木 金 土");

  const firstDate = dayjs(`${year}-${month}-01`);
  const lastDate = firstDate.endOf("month");
  for (let i = 0; i < firstDate.day(); i++) {
    process.stdout.write(`${" ".repeat(DAY_WIDTH)} `);
  }
  for (let i = 1; i <= lastDate.date(); i++) {
    let dayString = i.toString().padStart(DAY_WIDTH, " ");
    process.stdout.write(dayString);

    const isEndOfWeek = (firstDate.day() + i) % DAYS_OF_THE_WEEK === 0;
    const isEndOfMonth = i === lastDate.date();
    if (isEndOfWeek || isEndOfMonth) {
      console.log();
    } else {
      process.stdout.write(" ");
    }
  }
  console.log();
}

runCalendarApp();
