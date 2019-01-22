import { createNextDayDeliveryDays } from "../DeliveryStep"

describe('Next Day Delivery Painted Door', () => {
  describe('most avaialbe delivery date', () => {
    // where D = current day
    test('should be D+1 when time is before cutoff (12pm)', () => {
      Date.now = jest.fn(() => new Date(2019, 0, 22, 10).valueOf()) // mock 2019-01-22 10am

      const nextDayDeliveryDays = createNextDayDeliveryDays()

      expect(nextDayDeliveryDays[0].date).toBe('2019-01-23')
      expect(nextDayDeliveryDays[0].label).toEqual(expect.stringContaining('£2.99'))
    })

    test('when time D+2 when time is after cutoff (12pm)', () => {
      Date.now = jest.fn(() => new Date(2019, 0, 22, 15).valueOf()) // mock 2019-01-22 3pm

      const nextDayDeliveryDays = createNextDayDeliveryDays()

      expect(nextDayDeliveryDays[0].date).toBe('2019-01-24')
      expect(nextDayDeliveryDays[0].label).toEqual(expect.stringContaining('£2.99'))
    })
  })

  describe('48 hour delivery', () => {
    test('should be D+2 when time is before cutoff (12pm)', () => {
      Date.now = jest.fn(() => new Date(2019, 0, 22, 10).valueOf()) // mock 2019-01-22 10pm

      const nextDayDeliveryDays = createNextDayDeliveryDays()

      expect(nextDayDeliveryDays[1].date).toBe('2019-01-24')
      expect(nextDayDeliveryDays[1].label).toEqual(expect.stringContaining('£1.99'))
    })

    test('should be D+3 when time is after cutoff (12pm)', () => {
      Date.now = jest.fn(() => new Date(2019, 0, 22, 15).valueOf()) // mock 2019-01-22 3pm

      const nextDayDeliveryDays = createNextDayDeliveryDays()

      expect(nextDayDeliveryDays[1].date).toBe('2019-01-25')
      expect(nextDayDeliveryDays[1].label).toEqual(expect.stringContaining('£1.99'))
    })
  })
})
