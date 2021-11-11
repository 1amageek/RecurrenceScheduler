import { TimeframeRepresentable } from "./TimeframeRepresentable"

export interface CalendarItemRepresentable extends TimeframeRepresentable {
  id: string
  isAllDay: boolean
}
