import { Range } from "./Range"

export interface TimeframeRepresentable {
    period: Range<Date>  // UTC
    timeZone?: { identifier: string }
}
