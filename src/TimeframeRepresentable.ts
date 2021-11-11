import { Range } from "./Range"

export interface TimeframeRepresentable {
    period: Range<Date>
    timeZone?: { identifier: string }
}
