import { CalendarItemRepresentable } from "./CalendarItemRepresentable";
import { RecurrenceScheduler } from "./index";
import { Recurrenceable } from "./Recurrenceable"
import { RecurrenceRule, Weekday } from "./RecurrenceRule";
import { DateTime } from "luxon"

describe("Asia/Tokyo", () => {

  describe("Weekly", () => {
    const recurrenceRules: RecurrenceRule[] = [{
      firstDayOfTheWeek: 2,
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
    const start = DateTime.fromISO("2021-12-14T11", { zone: "Asia/Tokyo" })
    const end = DateTime.fromISO("2022-01-13T15", { zone: "Asia/Tokyo" })
    const occurrenceDate = DateTime.fromISO("2021-12-14T10", { zone: "Asia/Tokyo" })
    const startTime = DateTime.fromISO("2021-12-14T10", { zone: "Asia/Tokyo" })
    const endTime = DateTime.fromISO("2021-12-14T14", { zone: "Asia/Tokyo" })

    // console.log({
    //   "発動": occurrenceDate.toISO(),
    //   "期間": [start.toISO(), end.toISO()],
    //   "時間": [startTime.toISO(), endTime.toISO()],
    //   "初め": [DateTime.fromISO("2021-12-15T00:00:00.000Z").setZone("Asia/Tokyo").toISO(), DateTime.fromISO("2021-12-15T09:00:00.000Z").setZone("Asia/Tokyo").toISO()]
    // })

    describe("1 week", () => {
      test("Asia/Tokyo", () => {
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate.toJSDate(),
          recurrenceRules: recurrenceRules,
          period: [startTime.toJSDate(), endTime.toJSDate()],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        console.log(calendarItems[0].period[0], calendarItems[0].period[1])
        expect(DateTime.fromJSDate(calendarItems[0].period[0]).toISO()).toEqual("2021-12-14T11:00:00.000+09:00")
        expect(DateTime.fromJSDate(calendarItems[0].period[1]).toISO()).toEqual("2021-12-14T14:00:00.000+09:00")
      })
    })

    describe("1 week", () => {
      test("UTC", () => {
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate.setZone("UTC").toJSDate(),
          recurrenceRules: recurrenceRules,
          period: [startTime.setZone("UTC").toJSDate(), endTime.setZone("UTC").toJSDate()],
          timeZone: { identifier: "UTC" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(DateTime.fromJSDate(calendarItems[0].period[0]).toISO()).toEqual("2021-12-15T10:00:00.000+09:00")
        expect(DateTime.fromJSDate(calendarItems[0].period[1]).toISO()).toEqual("2021-12-15T14:00:00.000+09:00")
      })
    })

    // describe("1 week", () => {
    //   test("Tokyo", () => {
    //     const item: Recurrenceable & CalendarItemRepresentable = {
    //       id: "id",
    //       isAllDay: false,
    //       occurrenceDate: occurrenceDate.toJSDate(),
    //       recurrenceRules: recurrenceRules,
    //       period: [startTime.setZone("Asia/Tokyo").toJSDate(), endTime.setZone("Asia/Tokyo").toJSDate()],
    //       timeZone: { identifier: "Asia/Tokyo" }
    //     }
    //     const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
    //     expect(calendarItems[0].period[0]).toEqual(new Date("2021-12-15T00:00:00.000Z"))
    //     expect(calendarItems[0].period[1]).toEqual(new Date("2021-12-15T09:00:00.000Z"))
    //   })
    // })

    // describe("1 week", () => {
    //   test("Tokyo", () => {
    //     const item: Recurrenceable & CalendarItemRepresentable = {
    //       id: "id",
    //       isAllDay: false,
    //       occurrenceDate: occurrenceDate.setZone("Asia/Tokyo").toJSDate(),
    //       recurrenceRules: recurrenceRules,
    //       period: [startTime.toJSDate(), endTime.toJSDate()],
    //       timeZone: { identifier: "Asia/Tokyo" }
    //     }
    //     const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
    //     expect(calendarItems[0].period[0]).toEqual(new Date("2021-12-15T00:00:00.000Z"))
    //     expect(calendarItems[0].period[1]).toEqual(new Date("2021-12-15T09:00:00.000Z"))
    //   })
    // })

    // describe("1 week", () => {
    //   test("Tokyo", () => {
    //     const item: Recurrenceable & CalendarItemRepresentable = {
    //       id: "id",
    //       isAllDay: false,
    //       occurrenceDate: occurrenceDate.setZone("Asia/Tokyo").toJSDate(),
    //       recurrenceRules: recurrenceRules,
    //       period: [startTime.setZone("Asia/Tokyo").toJSDate(), endTime.setZone("Asia/Tokyo").toJSDate()],
    //       timeZone: { identifier: "Asia/Tokyo" }
    //     }
    //     const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
    //     expect(calendarItems[0].period[0]).toEqual(new Date("2021-12-15T00:00:00.000Z"))
    //     expect(calendarItems[0].period[1]).toEqual(new Date("2021-12-15T09:00:00.000Z"))
    //   })
    // })
  })
})