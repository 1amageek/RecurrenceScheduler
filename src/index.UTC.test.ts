import { CalendarItemRepresentable } from "./CalendarItemRepresentable";
import { RecurrenceScheduler } from "./index";
import { Recurrenceable } from "./Recurrenceable"
import { RecurrenceRule, Weekday } from "./RecurrenceRule";
import { DateTime } from "luxon"

describe("UTC", () => {

  describe("Not Reccur", () => {
    const recurrenceRules: RecurrenceRule[] = []

    test("occurrenceDateがRangeのLowerよりも小さい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
      const startTime = new Date(Date.UTC(2021, 0, 1, 8))
      const endTime = new Date(Date.UTC(2021, 0, 1, 17))
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        startDate: startTime,
        endDate: endTime
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems.length).toEqual(0)
    })

    test("occurrenceDateがRangeのLowerと同じ", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "UTC" }).toJSDate()
      const startTime = new Date(Date.UTC(2021, 0, 1, 8))
      const endTime = new Date(Date.UTC(2021, 0, 1, 17))
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        startDate: startTime,
        endDate: endTime
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T09:00:00.000Z"))
      expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
      expect(calendarItems.length).toEqual(1)
    })

    test("occurrenceDateがRangeのLowerより大きい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-05", { zone: "UTC" }).toJSDate()
      const startTime = new Date(Date.UTC(2021, 0, 1, 8))
      const endTime = new Date(Date.UTC(2021, 0, 1, 17))
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        startDate: startTime,
        endDate: endTime
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems.length).toEqual(0)
    })

    test("occurrenceDateがRangeのUpperより大きい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-09", { zone: "UTC" }).toJSDate()
      const startTime = new Date(Date.UTC(2021, 0, 1, 8))
      const endTime = new Date(Date.UTC(2021, 0, 1, 17))
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        startDate: startTime,
        endDate: endTime
      }
      const start = DateTime.fromISO("2021-01-04", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems.length).toEqual(0)
    })
  })

  describe("Daily", () => {
    const recurrenceRules: RecurrenceRule[] = [{
      firstDayOfTheWeek: 0,
      frequency: "daily",
      interval: 1
    }]

    test("occurrenceDateがRangeのLowerよりも小さい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
      const startTime = new Date(Date.UTC(2021, 0, 1, 8))
      const endTime = new Date(Date.UTC(2021, 0, 1, 17))
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        startDate: startTime,
        endDate: endTime
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T09:00:00.000Z"))
      expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
      expect(calendarItems[1].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
      expect(calendarItems[1].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
      expect(calendarItems[2].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
      expect(calendarItems[2].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
      expect(calendarItems[3].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
      expect(calendarItems[3].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
      expect(calendarItems.length).toEqual(4)
    })

    test("occurrenceDateがRangeのLowerと同じ", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "UTC" }).toJSDate()
      const startTime = new Date(Date.UTC(2021, 0, 1, 8))
      const endTime = new Date(Date.UTC(2021, 0, 1, 17))
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        startDate: startTime,
        endDate: endTime
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T09:00:00.000Z"))
      expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
      expect(calendarItems[1].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
      expect(calendarItems[1].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
      expect(calendarItems[2].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
      expect(calendarItems[2].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
      expect(calendarItems[3].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
      expect(calendarItems[3].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
      expect(calendarItems.length).toEqual(4)
    })

    test("occurrenceDateがRangeのLowerより大きい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-05", { zone: "UTC" }).toJSDate()
      const startTime = new Date(Date.UTC(2021, 0, 1, 8))
      const endTime = new Date(Date.UTC(2021, 0, 1, 17))
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        startDate: startTime,
        endDate: endTime
      }
      const start = DateTime.fromISO("2021-01-04T09", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })
      const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
      expect(calendarItems[0].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
      expect(calendarItems[0].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
      expect(calendarItems[1].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
      expect(calendarItems[1].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
      expect(calendarItems[2].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
      expect(calendarItems[2].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
      expect(calendarItems.length).toEqual(3)
    })

    test("occurrenceDateがRangeのUpperより大きい", () => {
      const occurrenceDate = DateTime.fromISO("2021-01-09", { zone: "UTC" }).toJSDate()
      const startTime = new Date(Date.UTC(2021, 0, 1, 8))
      const endTime = new Date(Date.UTC(2021, 0, 1, 17))
      const item: Recurrenceable & CalendarItemRepresentable = {
        id: "id",
        isAllDay: false,
        occurrenceDate: occurrenceDate,
        recurrenceRules: recurrenceRules,
        startDate: startTime,
        endDate: endTime
      }
      const start = DateTime.fromISO("2021-01-04", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })
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
      const start = DateTime.fromISO("2021-01-04", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-08", { zone: "UTC" })

      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-05", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(3)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-09", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
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
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(10)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(10)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-10", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-11T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-11T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-12T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-12T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-13T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-13T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(5)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-17", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
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
      const start = DateTime.fromISO("2021-01-06T09", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-30", { zone: "UTC" })
      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-06T09:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-06", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-06T09:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-07", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(3)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-10", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
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
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(8)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-06", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(8)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-07", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(7)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-03-01", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
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
      const start = DateTime.fromISO("2021-01-06T09", { zone: "UTC" })
      const end = DateTime.fromISO("2021-01-30", { zone: "UTC" })
      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-06T09:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-06", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-06T09:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(4)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-07", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(3)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-10", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems.length).toEqual(0)
      })
    })

    describe("2 years", () => {
      const start = DateTime.fromISO("2021-01-06T09", { zone: "UTC" })
      const end = DateTime.fromISO("2022-01-28", { zone: "UTC" })
      test("occurrenceDateがRangeのLowerよりも小さい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-06T09:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems[4].startDate).toEqual(new Date("2022-01-06T08:00:00.000Z"))
        expect(calendarItems[4].endDate).toEqual(new Date("2022-01-06T17:00:00.000Z"))
        expect(calendarItems[5].startDate).toEqual(new Date("2022-01-07T08:00:00.000Z"))
        expect(calendarItems[5].endDate).toEqual(new Date("2022-01-07T17:00:00.000Z"))
        expect(calendarItems[6].startDate).toEqual(new Date("2022-01-08T08:00:00.000Z"))
        expect(calendarItems[6].endDate).toEqual(new Date("2022-01-08T17:00:00.000Z"))
        expect(calendarItems[7].startDate).toEqual(new Date("2022-01-09T08:00:00.000Z"))
        expect(calendarItems[7].endDate).toEqual(new Date("2022-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(8)
      })

      test("occurrenceDateがRangeのLowerと同じ", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-06", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-06T09:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[3].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[3].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems[4].startDate).toEqual(new Date("2022-01-06T08:00:00.000Z"))
        expect(calendarItems[4].endDate).toEqual(new Date("2022-01-06T17:00:00.000Z"))
        expect(calendarItems[5].startDate).toEqual(new Date("2022-01-07T08:00:00.000Z"))
        expect(calendarItems[5].endDate).toEqual(new Date("2022-01-07T17:00:00.000Z"))
        expect(calendarItems[6].startDate).toEqual(new Date("2022-01-08T08:00:00.000Z"))
        expect(calendarItems[6].endDate).toEqual(new Date("2022-01-08T17:00:00.000Z"))
        expect(calendarItems[7].startDate).toEqual(new Date("2022-01-09T08:00:00.000Z"))
        expect(calendarItems[7].endDate).toEqual(new Date("2022-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(8)
      })

      test("occurrenceDateがRangeのLowerより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-01-07", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems[0].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
        expect(calendarItems[0].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
        expect(calendarItems[1].startDate).toEqual(new Date("2021-01-08T08:00:00.000Z"))
        expect(calendarItems[1].endDate).toEqual(new Date("2021-01-08T17:00:00.000Z"))
        expect(calendarItems[2].startDate).toEqual(new Date("2021-01-09T08:00:00.000Z"))
        expect(calendarItems[2].endDate).toEqual(new Date("2021-01-09T17:00:00.000Z"))
        expect(calendarItems.length).toEqual(7)
      })

      test("occurrenceDateがRangeのUpperより大きい", () => {
        const occurrenceDate = DateTime.fromISO("2021-03-01", { zone: "UTC" }).toJSDate()
        const startTime = new Date(Date.UTC(2021, 0, 1, 8))
        const endTime = new Date(Date.UTC(2021, 0, 1, 17))
        const item: Recurrenceable & CalendarItemRepresentable = {
          id: "id",
          isAllDay: false,
          occurrenceDate: occurrenceDate,
          recurrenceRules: recurrenceRules,
          startDate: startTime,
          endDate: endTime
        }
        const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
        expect(calendarItems.length).toEqual(0)
      })
    })
  })
})
