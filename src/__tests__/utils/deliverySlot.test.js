import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import deliverySlotUtil from 'utils/deliverySlot'

describe('utils/deliverySlot', () => {

  describe('toTimeRange', () => {
    test('it should take in a deliverySlot and give out a time range', () => {
      const deliverySlot = Immutable.fromJS({
        deliveryStart: '10:00:00',
        deliveryEnd: '16:59:59',
      })

      expect(deliverySlotUtil.toTimeRange(deliverySlot)).toEqual('10am - 5pm')
    })
  })

  describe('isAfterCutoff', () => {
    test('it should return true when the time is after 12 midday', () => {
      Date.now = jest.fn(() => new Date('2019-01-01T13:24:00').valueOf())

      expect(deliverySlotUtil.isAfterCutoff()).toEqual(true)
    })

    test('it should return false when the time is before 12 midday', () => {
      Date.now = jest.fn(() => new Date('2019-01-01T09:24:00').valueOf())

      expect(deliverySlotUtil.isAfterCutoff()).toEqual(false)
    })
  })

  describe('getDateOffset', () => {
    test('it should return 2 when the day is two days away and time is before 12 midday', () => {
      Date.now = jest.fn(() => new Date('2019-01-01T09:24:00').valueOf())

      expect(deliverySlotUtil.getDateOffset('2019-01-03')).toEqual(2)
    })

    test('it should return 1 when the day is two days away and time is after 12 midday', () => {
      Date.now = jest.fn(() => new Date('2019-01-01T13:24:00').valueOf())

      expect(deliverySlotUtil.getDateOffset('2019-01-03')).toEqual(1)
    })
  })

  describe('Next Day Delivery Painted Door', () => {
    describe('most avaialbe delivery date', () => {
      // where D = current day
      test('should be D+1 when time is before cutoff (12pm)', () => {
        Date.now = jest.fn(() => new Date(2019, 0, 22, 10).valueOf()) // mock 2019-01-22 10am
  
        const nextDayDeliveryDays = deliverySlotUtil.createNextDayDeliveryDays()
  
        expect(nextDayDeliveryDays[0].date).toBe('2019-01-23')
        expect(nextDayDeliveryDays[0].label).toEqual(expect.stringContaining('£2.99'))
      })
  
      test('when time D+2 when time is after cutoff (12pm)', () => {
        Date.now = jest.fn(() => new Date(2019, 0, 22, 15).valueOf()) // mock 2019-01-22 3pm
  
        const nextDayDeliveryDays = deliverySlotUtil.createNextDayDeliveryDays()
  
        expect(nextDayDeliveryDays[0].date).toBe('2019-01-24')
        expect(nextDayDeliveryDays[0].label).toEqual(expect.stringContaining('£2.99'))
      })
    })
  
    describe('48 hour delivery', () => {
      test('should be D+2 when time is before cutoff (12pm)', () => {
        Date.now = jest.fn(() => new Date(2019, 0, 22, 10).valueOf()) // mock 2019-01-22 10pm
  
        const nextDayDeliveryDays = deliverySlotUtil.createNextDayDeliveryDays()
  
        expect(nextDayDeliveryDays[1].date).toBe('2019-01-24')
        expect(nextDayDeliveryDays[1].label).toEqual(expect.stringContaining('£1.99'))
      })
  
      test('should be D+3 when time is after cutoff (12pm)', () => {
        Date.now = jest.fn(() => new Date(2019, 0, 22, 15).valueOf()) // mock 2019-01-22 3pm
  
        const nextDayDeliveryDays = deliverySlotUtil.createNextDayDeliveryDays()
  
        expect(nextDayDeliveryDays[1].date).toBe('2019-01-25')
        expect(nextDayDeliveryDays[1].label).toEqual(expect.stringContaining('£1.99'))
      })
    })
  })
})
