import { CalendarItemRepresentable } from "./CalendarItemRepresentable";
import { RecurrenceScheduler } from "./index";
import { Recurrenceable } from "./Recurrenceable"
import { RecurrenceRule, Weekday } from "./RecurrenceRule";
import { DateTime } from "luxon"


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

    test("2021-12", () => {
      const start = DateTime.fromISO("2021-12-01", { zone: "UTC" })
      const end = DateTime.fromISO("2022-01-01", { zone: "UTC" })
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
      expect(calendarItems[0].startDate).toEqual(new Date("2021-12-01T08:00:00.000Z"))
      expect(calendarItems[0].endDate).toEqual(new Date("2021-12-01T17:00:00.000Z"))
      expect(calendarItems[1].startDate).toEqual(new Date("2021-12-02T08:00:00.000Z"))
      expect(calendarItems[1].endDate).toEqual(new Date("2021-12-02T17:00:00.000Z"))
      expect(calendarItems[2].startDate).toEqual(new Date("2021-12-03T08:00:00.000Z"))
      expect(calendarItems[2].endDate).toEqual(new Date("2021-12-03T17:00:00.000Z"))
      expect(calendarItems[3].startDate).toEqual(new Date("2021-12-06T08:00:00.000Z"))
      expect(calendarItems[3].endDate).toEqual(new Date("2021-12-06T17:00:00.000Z"))
      expect(calendarItems[4].startDate).toEqual(new Date("2021-12-07T08:00:00.000Z"))
      expect(calendarItems[4].endDate).toEqual(new Date("2021-12-07T17:00:00.000Z"))
      expect(calendarItems[5].startDate).toEqual(new Date("2021-12-08T08:00:00.000Z"))
      expect(calendarItems[5].endDate).toEqual(new Date("2021-12-08T17:00:00.000Z"))
      expect(calendarItems[6].startDate).toEqual(new Date("2021-12-09T08:00:00.000Z"))
      expect(calendarItems[6].endDate).toEqual(new Date("2021-12-09T17:00:00.000Z"))
      expect(calendarItems[7].startDate).toEqual(new Date("2021-12-10T08:00:00.000Z"))
      expect(calendarItems[7].endDate).toEqual(new Date("2021-12-10T17:00:00.000Z"))
      expect(calendarItems[8].startDate).toEqual(new Date("2021-12-13T08:00:00.000Z"))
      expect(calendarItems[8].endDate).toEqual(new Date("2021-12-13T17:00:00.000Z"))
      expect(calendarItems[9].startDate).toEqual(new Date("2021-12-14T08:00:00.000Z"))
      expect(calendarItems[9].endDate).toEqual(new Date("2021-12-14T17:00:00.000Z"))
      expect(calendarItems[10].startDate).toEqual(new Date("2021-12-15T08:00:00.000Z"))
      expect(calendarItems[10].endDate).toEqual(new Date("2021-12-15T17:00:00.000Z"))
      expect(calendarItems[11].startDate).toEqual(new Date("2021-12-16T08:00:00.000Z"))
      expect(calendarItems[11].endDate).toEqual(new Date("2021-12-16T17:00:00.000Z"))
      expect(calendarItems[12].startDate).toEqual(new Date("2021-12-17T08:00:00.000Z"))
      expect(calendarItems[12].endDate).toEqual(new Date("2021-12-17T17:00:00.000Z"))
      expect(calendarItems[13].startDate).toEqual(new Date("2021-12-20T08:00:00.000Z"))
      expect(calendarItems[13].endDate).toEqual(new Date("2021-12-20T17:00:00.000Z"))
      expect(calendarItems[14].startDate).toEqual(new Date("2021-12-21T08:00:00.000Z"))
      expect(calendarItems[14].endDate).toEqual(new Date("2021-12-21T17:00:00.000Z"))
      expect(calendarItems[15].startDate).toEqual(new Date("2021-12-22T08:00:00.000Z"))
      expect(calendarItems[15].endDate).toEqual(new Date("2021-12-22T17:00:00.000Z"))
      expect(calendarItems[16].startDate).toEqual(new Date("2021-12-23T08:00:00.000Z"))
      expect(calendarItems[16].endDate).toEqual(new Date("2021-12-23T17:00:00.000Z"))
      expect(calendarItems[17].startDate).toEqual(new Date("2021-12-24T08:00:00.000Z"))
      expect(calendarItems[17].endDate).toEqual(new Date("2021-12-24T17:00:00.000Z"))
      expect(calendarItems[18].startDate).toEqual(new Date("2021-12-27T08:00:00.000Z"))
      expect(calendarItems[18].endDate).toEqual(new Date("2021-12-27T17:00:00.000Z"))
      expect(calendarItems[19].startDate).toEqual(new Date("2021-12-28T08:00:00.000Z"))
      expect(calendarItems[19].endDate).toEqual(new Date("2021-12-28T17:00:00.000Z"))
      expect(calendarItems[20].startDate).toEqual(new Date("2021-12-29T08:00:00.000Z"))
      expect(calendarItems[20].endDate).toEqual(new Date("2021-12-29T17:00:00.000Z"))
      expect(calendarItems[21].startDate).toEqual(new Date("2021-12-30T08:00:00.000Z"))
      expect(calendarItems[21].endDate).toEqual(new Date("2021-12-30T17:00:00.000Z"))
      expect(calendarItems[22].startDate).toEqual(new Date("2021-12-31T08:00:00.000Z"))
      expect(calendarItems[22].endDate).toEqual(new Date("2021-12-31T17:00:00.000Z"))
      expect(calendarItems.length).toEqual(23)
    })

    test("2022-02", () => {
      const start = DateTime.fromISO("2022-02-01", { zone: "UTC" })
      const end = DateTime.fromISO("2022-03-01", { zone: "UTC" })
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
      expect(calendarItems[0].startDate).toEqual(new Date("2022-02-01T08:00:00.000Z"))
      expect(calendarItems[0].endDate).toEqual(new Date("2022-02-01T17:00:00.000Z"))
      expect(calendarItems[1].startDate).toEqual(new Date("2022-02-02T08:00:00.000Z"))
      expect(calendarItems[1].endDate).toEqual(new Date("2022-02-02T17:00:00.000Z"))
      expect(calendarItems[2].startDate).toEqual(new Date("2022-02-03T08:00:00.000Z"))
      expect(calendarItems[2].endDate).toEqual(new Date("2022-02-03T17:00:00.000Z"))
      expect(calendarItems[3].startDate).toEqual(new Date("2022-02-04T08:00:00.000Z"))
      expect(calendarItems[3].endDate).toEqual(new Date("2022-02-04T17:00:00.000Z"))
      expect(calendarItems[4].startDate).toEqual(new Date("2022-02-07T08:00:00.000Z"))
      expect(calendarItems[4].endDate).toEqual(new Date("2022-02-07T17:00:00.000Z"))
      expect(calendarItems[5].startDate).toEqual(new Date("2022-02-08T08:00:00.000Z"))
      expect(calendarItems[5].endDate).toEqual(new Date("2022-02-08T17:00:00.000Z"))
      expect(calendarItems[6].startDate).toEqual(new Date("2022-02-09T08:00:00.000Z"))
      expect(calendarItems[6].endDate).toEqual(new Date("2022-02-09T17:00:00.000Z"))
      expect(calendarItems[7].startDate).toEqual(new Date("2022-02-10T08:00:00.000Z"))
      expect(calendarItems[7].endDate).toEqual(new Date("2022-02-10T17:00:00.000Z"))
      expect(calendarItems[8].startDate).toEqual(new Date("2022-02-11T08:00:00.000Z"))
      expect(calendarItems[8].endDate).toEqual(new Date("2022-02-11T17:00:00.000Z"))
      expect(calendarItems[9].startDate).toEqual(new Date("2022-02-14T08:00:00.000Z"))
      expect(calendarItems[9].endDate).toEqual(new Date("2022-02-14T17:00:00.000Z"))
      expect(calendarItems[10].startDate).toEqual(new Date("2022-02-15T08:00:00.000Z"))
      expect(calendarItems[10].endDate).toEqual(new Date("2022-02-15T17:00:00.000Z"))
      expect(calendarItems[11].startDate).toEqual(new Date("2022-02-16T08:00:00.000Z"))
      expect(calendarItems[11].endDate).toEqual(new Date("2022-02-16T17:00:00.000Z"))
      expect(calendarItems[12].startDate).toEqual(new Date("2022-02-17T08:00:00.000Z"))
      expect(calendarItems[12].endDate).toEqual(new Date("2022-02-17T17:00:00.000Z"))
      expect(calendarItems[13].startDate).toEqual(new Date("2022-02-18T08:00:00.000Z"))
      expect(calendarItems[13].endDate).toEqual(new Date("2022-02-18T17:00:00.000Z"))
      expect(calendarItems[14].startDate).toEqual(new Date("2022-02-21T08:00:00.000Z"))
      expect(calendarItems[14].endDate).toEqual(new Date("2022-02-21T17:00:00.000Z"))
      expect(calendarItems[15].startDate).toEqual(new Date("2022-02-22T08:00:00.000Z"))
      expect(calendarItems[15].endDate).toEqual(new Date("2022-02-22T17:00:00.000Z"))
      expect(calendarItems[16].startDate).toEqual(new Date("2022-02-23T08:00:00.000Z"))
      expect(calendarItems[16].endDate).toEqual(new Date("2022-02-23T17:00:00.000Z"))
      expect(calendarItems[17].startDate).toEqual(new Date("2022-02-24T08:00:00.000Z"))
      expect(calendarItems[17].endDate).toEqual(new Date("2022-02-24T17:00:00.000Z"))
      expect(calendarItems[18].startDate).toEqual(new Date("2022-02-25T08:00:00.000Z"))
      expect(calendarItems[18].endDate).toEqual(new Date("2022-02-25T17:00:00.000Z"))
      expect(calendarItems[19].startDate).toEqual(new Date("2022-02-28T08:00:00.000Z"))
      expect(calendarItems[19].endDate).toEqual(new Date("2022-02-28T17:00:00.000Z"))
      expect(calendarItems.length).toEqual(20)
    })

    // test("occurrenceDate???Range???Lower?????????", () => {
    //   const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "UTC" }).toJSDate()
    //   const startTime = new Date(Date.UTC(2021, 0, 1, 8))
    //   const endTime = new Date(Date.UTC(2021, 0, 1, 17))
    //   const item: Recurrenceable & CalendarItemRepresentable = {
    //     id: "id",
    //     isAllDay: false,
    //     occurrenceDate: occurrenceDate,
    //     recurrenceRules: recurrenceRules,
    //             startDate: startTime,
        // endDate: endTime
    //   }
    //   const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
    //   expect(calendarItems[0].startDate).toEqual(new Date("2021-12-01T08:00:00.000Z"))
    //   expect(calendarItems[0].endDate).toEqual(new Date("2021-12-01T17:00:00.000Z"))
    //   expect(calendarItems[1].startDate).toEqual(new Date("2021-12-02T08:00:00.000Z"))
    //   expect(calendarItems[1].endDate).toEqual(new Date("2021-12-02T17:00:00.000Z"))
    //   expect(calendarItems[2].startDate).toEqual(new Date("2021-12-03T08:00:00.000Z"))
    //   expect(calendarItems[2].endDate).toEqual(new Date("2021-12-03T17:00:00.000Z"))
    //   expect(calendarItems[3].startDate).toEqual(new Date("2021-12-04T08:00:00.000Z"))
    //   expect(calendarItems[3].endDate).toEqual(new Date("2021-12-04T17:00:00.000Z"))
    //   expect(calendarItems.length).toEqual(4)
    // })

    // test("occurrenceDate???Range???Lower???????????????", () => {
    //   const occurrenceDate = DateTime.fromISO("2021-01-05", { zone: "UTC" }).toJSDate()
    //   const startTime = new Date(Date.UTC(2021, 0, 1, 8))
    //   const endTime = new Date(Date.UTC(2021, 0, 1, 17))
    //   const item: Recurrenceable & CalendarItemRepresentable = {
    //     id: "id",
    //     isAllDay: false,
    //     occurrenceDate: occurrenceDate,
    //     recurrenceRules: recurrenceRules,
    //             startDate: startTime,
        // endDate: endTime
    //   }
    //   const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
    //   expect(calendarItems[0].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
    //   expect(calendarItems[0].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
    //   expect(calendarItems[1].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
    //   expect(calendarItems[1].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
    //   expect(calendarItems[2].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
    //   expect(calendarItems[2].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
    //   expect(calendarItems.length).toEqual(3)
    // })

    // test("occurrenceDate???Range???Upper???????????????", () => {
    //   const occurrenceDate = DateTime.fromISO("2021-01-09", { zone: "UTC" }).toJSDate()
    //   const startTime = new Date(Date.UTC(2021, 0, 1, 8))
    //   const endTime = new Date(Date.UTC(2021, 0, 1, 17))
    //   const item: Recurrenceable & CalendarItemRepresentable = {
    //     id: "id",
    //     isAllDay: false,
    //     occurrenceDate: occurrenceDate,
    //     recurrenceRules: recurrenceRules,
    //             startDate: startTime,
        // endDate: endTime
    //   }
    //   const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
    //   expect(calendarItems.length).toEqual(0)
    // })
  })

  // describe("2 weeks", () => {
  //   const start = DateTime.fromISO("2021-01-03", { zone: "UTC" })
  //   const end = DateTime.fromISO("2021-01-17", { zone: "UTC" })
  //   test("occurrenceDate???Range???Lower??????????????????", () => {
  //     const occurrenceDate = DateTime.fromISO("2021-01-01", { zone: "UTC" }).toJSDate()
  //     const startTime = new Date(Date.UTC(2021, 0, 1, 8))
  //     const endTime = new Date(Date.UTC(2021, 0, 1, 17))
  //     const item: Recurrenceable & CalendarItemRepresentable = {
  //       id: "id",
  //       isAllDay: false,
  //       occurrenceDate: occurrenceDate,
  //       recurrenceRules: recurrenceRules,
  //               startDate: startTime,
        // endDate: endTime
  //     }
  //     const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
  //     expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T08:00:00.000Z"))
  //     expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
  //     expect(calendarItems[1].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
  //     expect(calendarItems[1].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
  //     expect(calendarItems[2].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
  //     expect(calendarItems[2].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
  //     expect(calendarItems[3].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
  //     expect(calendarItems[3].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
  //     expect(calendarItems.length).toEqual(10)
  //   })

  //   test("occurrenceDate???Range???Lower?????????", () => {
  //     const occurrenceDate = DateTime.fromISO("2021-01-04", { zone: "UTC" }).toJSDate()
  //     const startTime = new Date(Date.UTC(2021, 0, 1, 8))
  //     const endTime = new Date(Date.UTC(2021, 0, 1, 17))
  //     const item: Recurrenceable & CalendarItemRepresentable = {
  //       id: "id",
  //       isAllDay: false,
  //       occurrenceDate: occurrenceDate,
  //       recurrenceRules: recurrenceRules,
  //               startDate: startTime,
        // endDate: endTime
  //     }
  //     const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
  //     expect(calendarItems[0].startDate).toEqual(new Date("2021-01-04T08:00:00.000Z"))
  //     expect(calendarItems[0].endDate).toEqual(new Date("2021-01-04T17:00:00.000Z"))
  //     expect(calendarItems[1].startDate).toEqual(new Date("2021-01-05T08:00:00.000Z"))
  //     expect(calendarItems[1].endDate).toEqual(new Date("2021-01-05T17:00:00.000Z"))
  //     expect(calendarItems[2].startDate).toEqual(new Date("2021-01-06T08:00:00.000Z"))
  //     expect(calendarItems[2].endDate).toEqual(new Date("2021-01-06T17:00:00.000Z"))
  //     expect(calendarItems[3].startDate).toEqual(new Date("2021-01-07T08:00:00.000Z"))
  //     expect(calendarItems[3].endDate).toEqual(new Date("2021-01-07T17:00:00.000Z"))
  //     expect(calendarItems.length).toEqual(10)
  //   })

  //   test("occurrenceDate???Range???Lower???????????????", () => {
  //     const occurrenceDate = DateTime.fromISO("2021-01-10", { zone: "UTC" }).toJSDate()
  //     const startTime = new Date(Date.UTC(2021, 0, 1, 8))
  //     const endTime = new Date(Date.UTC(2021, 0, 1, 17))
  //     const item: Recurrenceable & CalendarItemRepresentable = {
  //       id: "id",
  //       isAllDay: false,
  //       occurrenceDate: occurrenceDate,
  //       recurrenceRules: recurrenceRules,
  //               startDate: startTime,
        // endDate: endTime
  //     }
  //     const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
  //     expect(calendarItems[0].startDate).toEqual(new Date("2021-01-11T08:00:00.000Z"))
  //     expect(calendarItems[0].endDate).toEqual(new Date("2021-01-11T17:00:00.000Z"))
  //     expect(calendarItems[1].startDate).toEqual(new Date("2021-01-12T08:00:00.000Z"))
  //     expect(calendarItems[1].endDate).toEqual(new Date("2021-01-12T17:00:00.000Z"))
  //     expect(calendarItems[2].startDate).toEqual(new Date("2021-01-13T08:00:00.000Z"))
  //     expect(calendarItems[2].endDate).toEqual(new Date("2021-01-13T17:00:00.000Z"))
  //     expect(calendarItems.length).toEqual(5)
  //   })

  //   test("occurrenceDate???Range???Upper???????????????", () => {
  //     const occurrenceDate = DateTime.fromISO("2021-01-17", { zone: "UTC" }).toJSDate()
  //     const startTime = new Date(Date.UTC(2021, 0, 1, 8))
  //     const endTime = new Date(Date.UTC(2021, 0, 1, 17))
  //     const item: Recurrenceable & CalendarItemRepresentable = {
  //       id: "id",
  //       isAllDay: false,
  //       occurrenceDate: occurrenceDate,
  //       recurrenceRules: recurrenceRules,
  //               startDate: startTime,
        // endDate: endTime
  //     }
  //     const calendarItems = RecurrenceScheduler.calendarItems(item, [start, end])
  //     expect(calendarItems.length).toEqual(0)
  //   })
  // })
})