import { addYears, addMonths, addWeeks, addDays, setHours, setMinutes, setSeconds, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, startOfWeekYear, startOfMonth, startOfYear, differenceInCalendarWeeks } from "date-fns"
import { Range } from "./Range"
import { Recurrenceable } from "./Recurrenceable"
import { CalendarItemRepresentable } from "./CalendarItemRepresentable"
import { Frequency } from "./RecurrenceRule"

/**
 * RecurrenceSchduler
 * ItemのrecurrenceRulesをパースしてCalendarItemを返す
 */
// TODO: テストを書く
export class RecurrenceScheduler {
  static calendarItems = <Item extends Recurrenceable & CalendarItemRepresentable, CalendarItem extends CalendarItemRepresentable>(id: string, item: Item, range: Range<Date>): CalendarItem[] => {

    if (!item.recurrenceRules.length) {
      return []
    }

    const makeCalendarItem = (date: Date, range: Range<Date>): CalendarItem | null => {
      const startDate = setTime(date, item.period[0])
      const endDate = setTime(date, item.period[1])
      if (startDate < range[0]) { return null }
      if (startDate > range[1]) { return null }
      const calendarItem = {
        id: item.id,
        isAllDay: item.isAllDay,
        period: [startDate, endDate],
        timeZone: item.timeZone
      } as CalendarItem
      return calendarItem
    }

    let calendarItems: CalendarItem[] = []
    const recurrenceRules = item.recurrenceRules

    for (const rule of recurrenceRules) {
      if (rule.interval == 0) { continue }
      if (range[1] < item.occurrenceDate) { continue }

      let lowerBound = range[0]
      let upperBound = range[1]

      const occurrenceDate = item.occurrenceDate

      if (range[0] < occurrenceDate) {
        lowerBound = occurrenceDate
      }

      const endDate = rule.recurrenceEnd?.endDate
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
          const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, addDays(occurrenceDate, -remainder), upperBound, rule.interval)
          let numberOfFrequencyRemaining = repeatFrequencyCount
          if (occurrenceCount) {
            let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
            numberOfFrequencyRemaining = numberOfOccurrencesRemaining / bundle
          }
          for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
            let interval = rule.interval * i
            let date = addDays(occurrenceDate, interval)
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
          const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, addDays(occurrenceDate, -remainder), upperBound, rule.interval)
          let numberOfFrequencyRemaining = repeatFrequencyCount
          if (occurrenceCount) {
            let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
            numberOfFrequencyRemaining = numberOfOccurrencesRemaining / bundle
          }
          const startDay = startOfWeekYear(occurrenceDate)
          for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
            for (const day of rule.daysOfTheWeek!) {
              let interval = rule.interval * i
              let date = addDays(addWeeks(startDay, interval), day.dayOfTheWeek - 1)
              const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
              if (calendarItem) {
                calendarItems.push(calendarItem)
              }
            }
          }
          for (let i = 0; i < numberOfFrequencyRemaining; i++) {
            const day = rule.daysOfTheWeek![i]
            const interval = numberOfFrequencyRemaining + 1
            let date = addDays(addWeeks(startDay, interval), day.dayOfTheWeek - 1)
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
            const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, addDays(occurrenceDate, -remainder), upperBound, rule.interval)
            let numberOfFrequencyRemaining = repeatFrequencyCount
            if (occurrenceCount) {
              let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
              numberOfFrequencyRemaining = numberOfOccurrencesRemaining / bundle
            }
            const startDay = startOfMonth(occurrenceDate)
            for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
              for (const dayOfWeek of daysOfTheWeek) {
                const interval = rule.interval * i
                const month = startOfMonth(addMonths(startDay, interval))
                const date = addDays(addDays(month, dayOfWeek.weekNumber * 7), dayOfWeek.dayOfTheWeek)
                const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                if (calendarItem) {
                  calendarItems.push(calendarItem)
                }
              }
            }
            for (let i = 0; i < numberOfFrequencyRemaining; i++) {
              const dayOfWeek = daysOfTheWeek[i]
              const interval = rule.interval * i
              const month = startOfMonth(addMonths(startDay, interval))
              const date = addDays(addDays(month, dayOfWeek.weekNumber * 7), dayOfWeek.dayOfTheWeek)
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
            const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, addDays(occurrenceDate, -remainder), upperBound, rule.interval)
            let numberOfFrequencyRemaining = repeatFrequencyCount
            if (occurrenceCount) {
              let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
              numberOfFrequencyRemaining = numberOfOccurrencesRemaining / bundle
            }
            const startDay = startOfMonth(occurrenceDate)
            for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
              for (const day of days) {
                const interval = rule.interval * i
                const date = addDays(addMonths(startDay, interval), day)
                const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                if (calendarItem) {
                  calendarItems.push(calendarItem)
                }
              }
            }
            for (let i = 0; i < numberOfFrequencyRemaining; i++) {
              const day = days[i]
              const interval = rule.interval * i
              const date = addDays(addMonths(startDay, interval), day)
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
            const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, addDays(occurrenceDate, -remainder), upperBound, rule.interval)
            let numberOfFrequencyRemaining = repeatFrequencyCount
            if (occurrenceCount) {
              let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
              numberOfFrequencyRemaining = numberOfOccurrencesRemaining / bundle
            }
            const startDay = startOfYear(occurrenceDate)
            for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
              for (const month of monthsOfTheYear) {
                const interval = rule.interval * i
                const year = startOfYear(addYears(startDay, interval))
                let date = addMonths(year, month)
                if (daysOfTheWeek.length == 0) {
                  const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                  if (calendarItem) {
                    calendarItems.push(calendarItem)
                  }
                } else {
                  for (const dayOfWeek of daysOfTheWeek) {
                    date = addDays(addDays(date, dayOfWeek.weekNumber * 7), dayOfWeek.dayOfTheWeek)
                    const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                    if (calendarItem) {
                      calendarItems.push(calendarItem)
                    }
                  }
                }
              }
            }
            for (let i = 0; i < numberOfFrequencyRemaining; i++) {
              const dayOfWeek = daysOfTheWeek[i]
              const interval = rule.interval * i
              const month = startOfMonth(addMonths(startDay, interval))
              const date = addDays(addDays(month, dayOfWeek.weekNumber * 7), dayOfWeek.dayOfTheWeek)
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
            const [repeatFrequencyCount] = frequencyCountAndRemainder(rule.frequency, addDays(occurrenceDate, -remainder), upperBound, rule.interval)
            let numberOfFrequencyRemaining = repeatFrequencyCount
            if (occurrenceCount) {
              let numberOfOccurrencesRemaining = occurrenceCount - occurredCount
              numberOfFrequencyRemaining = numberOfOccurrencesRemaining / bundle
            }
            const startDay = startOfYear(occurrenceDate)
            for (let i = currentRepeatFrequencyCount; i <= numberOfFrequencyRemaining; i++) {
              for (const day of days) {
                const interval = rule.interval * i
                const date = addDays(addYears(startDay, interval), day)
                const calendarItem = makeCalendarItem(date, [lowerBound, upperBound])
                if (calendarItem) {
                  calendarItems.push(calendarItem)
                }
              }
            }
            for (let i = 0; i < numberOfFrequencyRemaining; i++) {
              const day = days[i]
              const interval = rule.interval * i
              const date = addDays(addYears(startDay, interval), day)
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

const frequencyCountAndRemainder = (frequency: Frequency, from: Date, to: Date, interval: number) => {
  let lowerDiff = 0
  switch (frequency) {
    case "daily": {
      lowerDiff = differenceInCalendarDays(to, from)
      break
    }
    case "weekly": {
      lowerDiff = differenceInCalendarWeeks(to, from)
      break
    }
    case "monthly": {
      lowerDiff = differenceInCalendarMonths(to, from)
      break
    }
    case "yearly": {
      lowerDiff = differenceInCalendarYears(to, from)
      break
    }
  }
  const frequencyCount = Math.floor(lowerDiff / interval)
  const remainder = lowerDiff % interval
  return [frequencyCount, remainder]
}

const setTime = (targetDate: Date, timeDate: Date) => {
  let date = setHours(targetDate, timeDate.getHours())
  date = setMinutes(date, timeDate.getMinutes())
  date = setSeconds(date, timeDate.getSeconds())
  return date
}

