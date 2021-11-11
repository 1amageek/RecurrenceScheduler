import { RecurrenceRule } from "./RecurrenceRule"
import { TimeframeRepresentable } from "./TimeframeRepresentable"

export interface Recurrenceable extends TimeframeRepresentable {
  occurrenceDate: Date
  recurrenceRules: RecurrenceRule[]
}
