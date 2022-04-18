/**
 * Delivery info on specified date.
 */
export interface DeliveryDay {
  /**
   * Delivery day date.
   */
  date: string // e.g. '2022-04-13'
  value: string // e.g. '2022-04-13'
  /**
   * If true, delivery is disabled for that day.
   */
  disabled: boolean
  /**
   * Display label for that day.
   */
  label: string // e.g. 'Fridays (starting 8th Apr)'
}
