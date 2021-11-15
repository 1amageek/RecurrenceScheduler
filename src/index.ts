import { DateTime } from "luxon"
import { Range } from "./Range"
import { Recurrenceable } from "./Recurrenceable"
import { CalendarItemRepresentable } from "./CalendarItemRepresentable"
import { Frequency } from "./RecurrenceRule"

export * from "./Range"
export * from "./Recurrenceable"
export * from "./CalendarItemRepresentable"
export * from "./RecurrenceRule"


/**
 * RecurrenceSchduler
 * ItemのrecurrenceRulesをパースしてCalendarItemを返す
 * カレンダーはISO 8601に準拠する
 * ISO 8601では、週の始まりを月曜日とし、最初の木曜日をその年の第1週としています。
 */
// TODO: テストを書く
export class RecurrenceScheduler {
  static calendarItems = <Item extends Recurrenceable & CalendarItemRepresentable, CalendarItem extends CalendarItemRepresentable>(id: string, item: Item, range: Range<DateTime>): CalendarItem[] => {

    if (!item.recurrenceRules.length) {
      return []
    }

    const makeCalendarItem = (date: DateTime, range: Range<DateTime>): CalendarItem | null => {
      const start = item.period[0]
      const end = item.period[1]
      const startDate = setTime(date, DateTime.fromObject({ year: start.getUTCFullYear(), month: start.getMonth() + 1, day: start.getUTCDay(), hour: start.getUTCHours(), minute: start.getMinutes() }, { zone: "UTC" }))
      const endDate = setTime(date, DateTime.fromObject({ year: end.getUTCFullYear(), month: end.getMonth() + 1, day: end.getUTCDay(), hour: end.getUTCHours(), minute: end.getMinutes() }, { zone: "UTC" }))
      if (startDate < range[0]) { return null }
      if (startDate > range[1]) { return null }
      const calendarItem = {
        id: item.id,
        isAllDay: item.isAllDay,
        period: [startDate.toJSDate(), endDate.toJSDate()],
        timeZone: item.timeZone
      } as CalendarItem
      return calendarItem
    }

    let calendarItems: CalendarItem[] = []
    const recurrenceRules = item.recurrenceRules

    for (const rule of recurrenceRules) {
      const occurrenceDate: DateTime = DateTime.fromJSDate(item.occurrenceDate, { zone: "UTC" })
      if (rule.interval == 0) { continue }
      if (range[1] < occurrenceDate) { continue }

      let lowerBound = range[0]
      let upperBound = range[1]

      if (range[0] < occurrenceDate) {
        lowerBound = occurrenceDate
      }

      const endDate = rule.recurrenceEnd?.endDate != undefined ? DateTime.fromJSDate(rule.recurrenceEnd?.endDate) : undefined
      if (endDate) {
        if (endDate < range[0]) { continue }
        if (range[1] < endDate) {
          upperBound = range[1]
        }
      }

      switch (rule.frequency) {
        case "daily": {
          const bundle = 1
          const [currentRepeatFrequencyCount, remainder] = frequencyCountAndRemainder(rule.frequency, occurrenceDate, lowerBound, rule.interval)
          const occurredCount = currentRepeatFrequencyCount * bundle
          const occurrenceCount = rule.recurrenceEnd?.occurrenceCount
          if (occurrenceCount) {
            if (occurrenceCount < occurredCount) { continue }
          }
          const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, occurrenceDate.minus({ day: remainder }), upperBound, rule.interval)
          let numberOfFrequencyRemaining = repeatFrequencyCount
          if (occurrenceCount) {
            let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
            numberOfFrequencyRemaining = numberOfOccurrencesRemaining / bundle
          }
          for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
            let interval = rule.interval * i
            let date = occurrenceDate.plus({ day: interval })
            const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
            if (calendarItem) {
              calendarItems.push(calendarItem)
            }
          }
          break
        }
        case "weekly": {
          const bundle = rule.daysOfTheWeek!.length
          const [currentRepeatFrequencyCount, remainder] = frequencyCountAndRemainder(rule.frequency, occurrenceDate, lowerBound, rule.interval)
          const occurredCount = currentRepeatFrequencyCount * bundle
          const occurrenceCount = rule.recurrenceEnd?.occurrenceCount
          if (occurrenceCount) {
            if (occurrenceCount < occurredCount) { continue }
          }
          const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, occurrenceDate.minus({ week: remainder }), upperBound, rule.interval)
          let numberOfFrequencyRemaining = repeatFrequencyCount
          let numberOfCountRemaining = 0
          if (occurrenceCount) {
            let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
            numberOfFrequencyRemaining = Math.floor(numberOfOccurrencesRemaining / bundle)
            numberOfCountRemaining = Math.floor(numberOfOccurrencesRemaining % bundle)
          }
          const startDay = occurrenceDate.startOf("week")
          for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
            for (const day of rule.daysOfTheWeek!) {
              const interval = rule.interval * i
              const date = startDay.plus({ week: interval }).plus({ day: day.dayOfTheWeek - rule.firstDayOfTheWeek })
              const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
              if (calendarItem) {
                calendarItems.push(calendarItem)
              }
            }
          }
          for (let i = 0; i < numberOfCountRemaining; i++) {
            const day = rule.daysOfTheWeek![i]
            const interval = numberOfFrequencyRemaining + 1
            const date = startDay.plus({ week: interval }).plus({ day: day.dayOfTheWeek - rule.firstDayOfTheWeek })
            const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
            if (calendarItem) {
              calendarItems.push(calendarItem)
            }
          }
          break
        }
        case "monthly": {
          const daysOfTheWeek = rule.daysOfTheWeek
          const daysOfTheMonth = rule.daysOfTheMonth
          if (daysOfTheWeek) {
            const bundle = daysOfTheWeek.length
            const [currentRepeatFrequencyCount, remainder] = frequencyCountAndRemainder(rule.frequency, occurrenceDate, lowerBound, rule.interval)
            const occurredCount = currentRepeatFrequencyCount * bundle
            const occurrenceCount = rule.recurrenceEnd?.occurrenceCount
            if (occurrenceCount) {
              if (occurrenceCount < occurredCount) { continue }
            }
            const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, occurrenceDate.minus({ month: remainder }), upperBound, rule.interval)
            let numberOfFrequencyRemaining = repeatFrequencyCount
            let numberOfCountRemaining = 0
            if (occurrenceCount) {
              let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
              numberOfFrequencyRemaining = Math.floor(numberOfOccurrencesRemaining / bundle)
              numberOfCountRemaining = Math.floor(numberOfOccurrencesRemaining % bundle)
            }
            const startDay = occurrenceDate.startOf("month")
            for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
              for (const dayOfWeek of daysOfTheWeek) {
                const interval = rule.interval * i
                const date = startDay
                  .plus({ month: interval })
                  .plus({ day: dayOfWeek.weekNumber * 7 })
                  .plus({ day: dayOfWeek.dayOfTheWeek })
                const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                if (calendarItem) {
                  calendarItems.push(calendarItem)
                }
              }
            }
            for (let i = 0; i < numberOfCountRemaining; i++) {
              const dayOfWeek = daysOfTheWeek[i]
              const interval = rule.interval * i
              const date = startDay
                .plus({ month: interval })
                .plus({ day: dayOfWeek.weekNumber * 7 })
                .plus({ day: dayOfWeek.dayOfTheWeek })
              const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
              if (calendarItem) {
                calendarItems.push(calendarItem)
              }
            }
          } else if (daysOfTheMonth) {
            const bundle = daysOfTheMonth.length
            const days = daysOfTheMonth
            const [currentRepeatFrequencyCount, remainder] = frequencyCountAndRemainder(rule.frequency, occurrenceDate, lowerBound, rule.interval)
            const occurredCount = currentRepeatFrequencyCount * bundle
            const occurrenceCount = rule.recurrenceEnd?.occurrenceCount
            if (occurrenceCount) {
              if (occurrenceCount < occurredCount) { continue }
            }
            const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, occurrenceDate.minus({ month: remainder }), upperBound, rule.interval)
            let numberOfFrequencyRemaining = repeatFrequencyCount
            let numberOfCountRemaining = 0
            if (occurrenceCount) {
              let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
              numberOfFrequencyRemaining = Math.floor(numberOfOccurrencesRemaining / bundle)
              numberOfCountRemaining = Math.floor(numberOfOccurrencesRemaining % bundle)
            }
            const startDay = occurrenceDate.startOf("month")
            for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
              for (const day of days) {
                const interval = rule.interval * i
                const date = startDay
                  .plus({ month: interval })
                  .set({ day: day })
                const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                if (calendarItem) {
                  calendarItems.push(calendarItem)
                }
              }
            }
            for (let i = 0; i < numberOfCountRemaining; i++) {
              const day = days[i]
              const interval = rule.interval * i
              const date = startDay
                .plus({ month: interval })
                .set({ day: day })
              const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
              if (calendarItem) {
                calendarItems.push(calendarItem)
              }
            }
          }
          break
        }
        case "yearly": {
          const monthsOfTheYear = rule.monthsOfTheYear
          const daysOfTheYear = rule.daysOfTheYear
          if (monthsOfTheYear) {
            const bundle = monthsOfTheYear.length
            const daysOfTheWeek = rule.daysOfTheWeek ?? []
            const [currentRepeatFrequencyCount, remainder] = frequencyCountAndRemainder(rule.frequency, occurrenceDate, lowerBound, rule.interval)
            const occurredCount = currentRepeatFrequencyCount * bundle
            const occurrenceCount = rule.recurrenceEnd?.occurrenceCount
            if (occurrenceCount) {
              if (occurrenceCount < occurredCount) { continue }
            }
            const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, occurrenceDate.minus({ year: remainder }), upperBound, rule.interval)
            let numberOfFrequencyRemaining = repeatFrequencyCount
            let numberOfCountRemaining = 0
            if (occurrenceCount) {
              let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
              numberOfFrequencyRemaining = Math.floor(numberOfOccurrencesRemaining / bundle)
              numberOfCountRemaining = Math.floor(numberOfOccurrencesRemaining % bundle)
            }
            const startDay = occurrenceDate.startOf("year")
            for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
              for (const month of monthsOfTheYear) {
                const interval = rule.interval * i
                const date = startDay
                  .plus({ year: interval })
                  .plus({ month: month })
                if (daysOfTheWeek.length == 0) {
                  const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                  if (calendarItem) {
                    calendarItems.push(calendarItem)
                  }
                } else {
                  for (const dayOfWeek of daysOfTheWeek) {
                    const date = startDay
                      .plus({ year: interval })
                      .plus({ month: month })
                      .plus({ day: dayOfWeek.weekNumber * 7 })
                      .plus({ day: dayOfWeek.dayOfTheWeek })
                    const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                    if (calendarItem) {
                      calendarItems.push(calendarItem)
                    }
                  }
                }
              }
            }
            for (let i = 0; i < numberOfCountRemaining; i++) {
              const dayOfWeek = daysOfTheWeek[i]
              const interval = rule.interval * i
              const date = startDay
                .plus({ month: interval })
                .plus({ day: dayOfWeek.weekNumber * 7 })
                .plus({ day: dayOfWeek.dayOfTheWeek })
              const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
              if (calendarItem) {
                calendarItems.push(calendarItem)
              }
            }
          } else if (daysOfTheYear) {
            const bundle = daysOfTheYear.length
            const days = daysOfTheYear
            const [currentRepeatFrequencyCount, remainder] = frequencyCountAndRemainder(rule.frequency, occurrenceDate, lowerBound, rule.interval)
            const occurredCount = currentRepeatFrequencyCount * bundle
            const occurrenceCount = rule.recurrenceEnd?.occurrenceCount
            if (occurrenceCount) {
              if (occurrenceCount < occurredCount) { continue }
            }
            const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, occurrenceDate.minus({ year: remainder }), upperBound, rule.interval)
            let numberOfFrequencyRemaining = repeatFrequencyCount
            let numberOfCountRemaining = 0
            if (occurrenceCount) {
              let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
              numberOfFrequencyRemaining = Math.floor(numberOfOccurrencesRemaining / bundle)
              numberOfCountRemaining = Math.floor(numberOfOccurrencesRemaining % bundle)
            }
            const startDay = occurrenceDate.startOf("year")
            for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
              for (const day of days) {
                const interval = rule.interval * i
                const date = startDay
                  .plus({ year: interval })
                  .set({ day: day })
                const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                if (calendarItem) {
                  calendarItems.push(calendarItem)
                }
              }
            }
            for (let i = 0; i < numberOfCountRemaining; i++) {
              const day = days[i]
              const interval = rule.interval * i
              const date = startDay
                .plus({ year: interval })
                .set({ day: day })
              const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
              if (calendarItem) {
                calendarItems.push(calendarItem)
              }
            }
          }
          break
        }
      }
    }
    return calendarItems
  }
}

const frequencyCountAndRemainder = (frequency: Frequency, from: DateTime, to: DateTime, interval: number) => {
  let lowerDiff = 0
  switch (frequency) {
    case "daily": {
      lowerDiff = to.diff(from, "days").days
      break
    }
    case "weekly": {
      lowerDiff = to.diff(from, "weeks").weeks
      break
    }
    case "monthly": {
      lowerDiff = to.diff(from, "months").months
      break
    }
    case "yearly": {
      lowerDiff = to.diff(from, "years").years
      break
    }
  }
  const frequencyCount = Math.floor(lowerDiff / interval)
  const remainder = Math.floor(lowerDiff % interval)
  return [frequencyCount, remainder]
}

const setTime = (targetDate: DateTime, timeDate: DateTime) => {
  const date = DateTime.fromObject({
    ...targetDate.toObject(),
    hour: timeDate.hour,
    minute: timeDate.minute
  }, { zone: "UTC" })
  return date
}

