import { TimeframeRepresentable } from "./TimeframeRepresentable"

/**
 * カレンダーアイテム
 * 時間は全てUTCで管理する
 */
export interface CalendarItemRepresentable extends TimeframeRepresentable {
  id: string
  isAllDay: boolean
}
