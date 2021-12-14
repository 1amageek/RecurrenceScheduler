import { CalendarItemRepresentable } from "./CalendarItemRepresentable";
import { RecurrenceScheduler } from "./index";
import { Recurrenceable } from "./Recurrenceable"
import { RecurrenceRule, Weekday } from "./RecurrenceRule";
import { DateTime } from "luxon"

describe("Asia/Tokyo", () => {

  describe("Daily", () => {
    const recurrenceRules: RecurrenceRule[] = [{
      firstDayOfTheWeek: 0,
      frequency: "daily",
      interval: 1
    }]

    test("occurrenceDateがRangeのLowerよりも小さい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "Asia/Tokyo" }).toJSDate()
      const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
      const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        period: [startTime, endTime],
        timeZone: { identifier: "Asia/Tokyo" }
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "Asia/Tokyo" })
      const end = DateTime.fromISO("2021-01-08", { zone: "Asia/Tokyo" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-04T00:00:00.000Z"))
      expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-04T08:00:00.000Z"))
      expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-04T23:00:00.000Z"))
      expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-05T08:00:00.000Z"))
      expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
      expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
      expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
      expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
      expect(DateTime.fromJSDate(calendarItems[0].period[0], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-04T09:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[0].period[1], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-04T17:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[1].period[0], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-05T08:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[1].period[1], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-05T17:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[2].period[0], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-06T08:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[2].period[1], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-06T17:00:00.000+09:00")
      expect(calendarItems.length).toEqual(4)
      expect(Weekday)
    })

    test("occurrenceDateがRangeのLowerと同じ", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "Asia/Tokyo" }).toJSDate()
      const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
      const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        period: [startTime, endTime],
        timeZone: { identifier: "Asia/Tokyo" }
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "Asia/Tokyo" })
      const end = DateTime.fromISO("2021-01-08", { zone: "Asia/Tokyo" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-04T00:00:00.000Z"))
      expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-04T08:00:00.000Z"))
      expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-04T23:00:00.000Z"))
      expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-05T08:00:00.000Z"))
      expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
      expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
      expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
      expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
      expect(calendarItems.length).toEqual(4)
    })

    test("occurrenceDateがRangeのLowerより大きい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-05", { zone: "Asia/Tokyo" }).toJSDate()
      const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
      const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        period: [startTime, endTime],
        timeZone: { identifier: "Asia/Tokyo" }
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "Asia/Tokyo" })
      const end = DateTime.fromISO("2021-01-08", { zone: "Asia/Tokyo" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-04T23:00:00.000Z"))
      expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-05T08:00:00.000Z"))
      expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
      expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
      expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
      expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
      expect(DateTime.fromJSDate(calendarItems[0].period[0], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-05T08:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[0].period[1], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-05T17:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[1].period[0], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-06T08:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[1].period[1], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-06T17:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[2].period[0], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-07T08:00:00.000+09:00")
      expect(DateTime.fromJSDate(calendarItems[2].period[1], { zone: "Asia/Tokyo" }).toISO()).toEqual("2021-01-07T17:00:00.000+09:00")
      expect(calendarItems.length).toEqual(3)
    })

    test("occurrenceDateがRangeのUpperより大きい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-09", { zone: "UTC" }).toJSDate()
      const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
      const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        period: [startTime, endTime],
        timeZone: { identifier: "Asia/Tokyo" }
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "Asia/Tokyo" })
      const end = DateTime.fromISO("2021-01-08", { zone: "Asia/Tokyo" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems.length).toEqual(0)
    })
  })

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

    describe("1 week", () => {
      const start = DateTime.fromISO("2021-01-04T09", { zone: "Asia/Tokyo" })
      const end = DateTime.fromISO("2021-01-08", { zone: "Asia/Tokyo" })

      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-04T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-04T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-04T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-04T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-04T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-04T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-05", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-05T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(3)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-09", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems.length).toEqual(0)
      })
    })

    describe("2 weeks", () => {
      const start = DateTime.fromISO("2021-01-03", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-17", { zone: "UTC" })
      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-03T23:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-04T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-04T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(10)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-04T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-04T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-04T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(10)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-10", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-10T23:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-11T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-11T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-12T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-12T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-13T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(5)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-17", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems.length).toEqual(0)
      })
    })
  })

  describe("Monthly", () => {
    const recurrenceRules: RecurrenceRule[] = [{
      firstDayOfTheWeek: 0,
      frequency: "monthly",
      interval: 1,
      daysOfTheMonth: [6, 7, 8, 9]
    }]

    describe("1 month", () => {
      const start = DateTime.fromISO("2021-01-05", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-30", { zone: "UTC" })
      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-06", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-06T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-07", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-07T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(3)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-10", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems.length).toEqual(0)
      })
    })

    describe("2 months", () => {
      const start = DateTime.fromISO("2021-01-05", { zone: "UTC" })
      const end = DateTime.fromISO("2021-02-28", { zone: "UTC" })
      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(8)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-06", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-06T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(8)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-07", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-07T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(7)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-03-01", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems.length).toEqual(0)
      })
    })

  })

  describe("Yearly", () => {
    const recurrenceRules: RecurrenceRule[] = [{
      firstDayOfTheWeek: 0,
      frequency: "yearly",
      interval: 1,
      daysOfTheYear: [6, 7, 8, 9]
    }]

    describe("1 year", () => {
      const start = DateTime.fromISO("2021-01-05", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-30", { zone: "UTC" })
      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-06", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-06T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-07", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-07T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(3)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-10", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems.length).toEqual(0)
      })
    })

    describe("2 years", () => {
      const start = DateTime.fromISO("2021-01-05", { zone: "UTC" })
      const end = DateTime.fromISO("2022-01-28", { zone: "UTC" })
      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-05T23:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[4].period[0]).toEqual(new Date("2022-01-05T23:00:00.000Z"))
        expect(calendarItems[4].period[1]).toEqual(new Date("2022-01-06T08:00:00.000Z"))
        expect(calendarItems[5].period[0]).toEqual(new Date("2022-01-06T23:00:00.000Z"))
        expect(calendarItems[5].period[1]).toEqual(new Date("2022-01-07T08:00:00.000Z"))
        expect(calendarItems[6].period[0]).toEqual(new Date("2022-01-07T23:00:00.000Z"))
        expect(calendarItems[6].period[1]).toEqual(new Date("2022-01-08T08:00:00.000Z"))
        expect(calendarItems[7].period[0]).toEqual(new Date("2022-01-08T23:00:00.000Z"))
        expect(calendarItems[7].period[1]).toEqual(new Date("2022-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(8)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-06", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-06T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-06T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[3].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[3].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[4].period[0]).toEqual(new Date("2022-01-05T23:00:00.000Z"))
        expect(calendarItems[4].period[1]).toEqual(new Date("2022-01-06T08:00:00.000Z"))
        expect(calendarItems[5].period[0]).toEqual(new Date("2022-01-06T23:00:00.000Z"))
        expect(calendarItems[5].period[1]).toEqual(new Date("2022-01-07T08:00:00.000Z"))
        expect(calendarItems[6].period[0]).toEqual(new Date("2022-01-07T23:00:00.000Z"))
        expect(calendarItems[6].period[1]).toEqual(new Date("2022-01-08T08:00:00.000Z"))
        expect(calendarItems[7].period[0]).toEqual(new Date("2022-01-08T23:00:00.000Z"))
        expect(calendarItems[7].period[1]).toEqual(new Date("2022-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(8)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-07", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].period[0]).toEqual(new Date("2021-01-07T00:00:00.000Z"))
        expect(calendarItems[0].period[1]).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].period[0]).toEqual(new Date("2021-01-07T23:00:00.000Z"))
        expect(calendarItems[1].period[1]).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].period[0]).toEqual(new Date("2021-01-08T23:00:00.000Z"))
        expect(calendarItems[2].period[1]).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems.length).toEqual(7)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-03-01", { zone: "UTC" }).toJSDate()
        const startTime = DateTime.fromISO("2021-01-01T08", { zone: "Asia/Tokyo" }).toJSDate()
        const endTime = DateTime.fromISO("2021-01-01T17", { zone: "Asia/Tokyo" }).toJSDate()
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          period: [startTime, endTime],
          timeZone: { identifier: "Asia/Tokyo" }
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems.length).toEqual(0)
      })
    })
  })
})