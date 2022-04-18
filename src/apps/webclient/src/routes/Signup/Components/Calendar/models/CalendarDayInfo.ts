import { Moment } from 'moment'

/**
 * Info about single day on calendar.
 */
export interface CalendarDayInfo {
  /**
   * Date assigned to that day.
   */
  date: Moment
  /**
   * If true, should be highlighted with primary color.
   */
  isSelected: boolean
  /**
   * If true, should be displayed as blank day with no number.
   */
  isBeforeTodayDate: boolean
  /**
   * If true, date number should be placed in circle.
   */
  isToday: boolean
  /**
   * If false, should be grayed out.
   */
  isDeliveryDay: boolean
}
