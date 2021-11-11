import { CalendarItemRepresentable } from "./CalendarItemRepresentable";
import { RecurrenceScheduler } from "./RecurrenceScheduler";
import { Recurrenceable } from "./Recurrenceable"
import { RecurrenceRule, Weekday } from "./RecurrenceRule";
// import { format } from "date-fns";

test("Daily", () => {
  const recurrenceRules: RecurrenceRule[] = [{
    firstDayOfTheWeek: 0,
    frequency: "daily",
    interval: 1
  }]
  const occurrenceDate = new Date(2021, 0, 1)
  const startTime = new Date(2021, 0, 1, 8)
  const endTime = new Date(2021, 0, 1, 10)
  const item: Recurrenceable & CalendarItemRepresentable = {
    id: "id",
    isAllDay: false,
    occurrenceDate: occurrenceDate,
    recurrenceRules: recurrenceRules,
    period: [startTime, endTime]
  }
  const start = new Date(2021, 0, 1)
  const end = new Date(2021, 0, 28)
  const calendarItems = RecurrenceScheduler.calendarItems("id", item, [start, end])

  expect(calendarItems[0].period[0]).toEqual(new Date("2020-12-31T23:00:00.000Z"))
  expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-01T01:00:00.000Z"))
  expect(calendarItems[calendarItems.length - 1].period[0]).toEqual(new Date("2021-01-26T23:00:00.000Z"))
  expect(calendarItems[calendarItems.length - 1].period[1]).toEqual(new Date("2021-01-27T01:00:00.000Z"))
})

test("Weekly", () => {
  const recurrenceRules: RecurrenceRule[] = [{
    firstDayOfTheWeek: 0,
    frequency: "weekly",
    interval: 1,
    daysOfTheWeek: [
      {
        dayOfTheWeek: Weekday.monday,
        weekNumber: 0
      },
      {
        dayOfTheWeek: Weekday.tuesday,
        weekNumber: 0
      },
      {
        dayOfTheWeek: Weekday.wednesday,
        weekNumber: 0
      },
      {
        dayOfTheWeek: Weekday.thursday,
        weekNumber: 0
      },
      {
        dayOfTheWeek: Weekday.friday,
        weekNumber: 0
      }
    ]
  }]
  const occurrenceDate = new Date(2021, 0, 1)
  const startTime = new Date(2021, 0, 1, 8)
  const endTime = new Date(2021, 0, 1, 10)
  const item: Recurrenceable & CalendarItemRepresentable = {
    id: "id",
    isAllDay: false,
    occurrenceDate: occurrenceDate,
    recurrenceRules: recurrenceRules,
    period: [startTime, endTime]
  }
  const start = new Date(2021, 0, 1)
  const end = new Date(2021, 0, 28)
  const calendarItems = RecurrenceScheduler.calendarItems("id", item, [start, end])
  // console.log(calendarItems)

  // for (const item of calendarItems) {
  //   console.log(format(item.period[0], "E"))
  // }

  expect(calendarItems[0].period[0]).toEqual(new Date("2020-12-31T23:00:00.000Z"))
  expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-01T01:00:00.000Z"))
  expect(calendarItems[calendarItems.length - 1].period[0]).toEqual(new Date("2021-01-26T23:00:00.000Z"))
  expect(calendarItems[calendarItems.length - 1].period[1]).toEqual(new Date("2021-01-27T01:00:00.000Z"))
})

test("Monthly", () => {
  const recurrenceRules: RecurrenceRule[] = [{
    firstDayOfTheWeek: 0,
    frequency: "monthly",
    interval: 1,
    daysOfTheMonth: [1, 2, 3, 4, 5]
  }]
  const occurrenceDate = new Date(2021, 0, 1)
  const startTime = new Date(2021, 0, 1, 8)
  const endTime = new Date(2021, 0, 1, 10)
  const item: Recurrenceable & CalendarItemRepresentable = {
    id: "id",
    isAllDay: false,
    occurrenceDate: occurrenceDate,
    recurrenceRules: recurrenceRules,
    period: [startTime, endTime]
  }
  const start = new Date(2021, 0, 1)
  const end = new Date(2021, 0, 28)
  const calendarItems = RecurrenceScheduler.calendarItems("id", item, [start, end])
  console.log(calendarItems)

  expect(calendarItems[0].period[0]).toEqual(new Date("2020-12-31T23:00:00.000Z"))
  expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-01T01:00:00.000Z"))
  expect(calendarItems[calendarItems.length - 1].period[0]).toEqual(new Date("2021-01-26T23:00:00.000Z"))
  expect(calendarItems[calendarItems.length - 1].period[1]).toEqual(new Date("2021-01-27T01:00:00.000Z"))
})