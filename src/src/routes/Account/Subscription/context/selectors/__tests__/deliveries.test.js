import { getAreDeliveriesLoaded, getCurrentDeliverySlot, getDeliverySlots, getDeliveryFrequency } from '../deliveries'

describe('deliveries selectors', () => {
  let contextState
  beforeEach(() => {
    contextState = {
      deliveries: {
        frequency: {
          currentValue: 1
        }
      }
    }
  })

  describe('getAreDeliveriesLoaded', () => {
    test('should return true', () => {
      expect(getAreDeliveriesLoaded(contextState)).toBe(true)
    })

    describe('When deliveries is undefined', () => {
      beforeEach(() => {
        contextState = {}
      })
      test('should return false', () => {
        expect(getAreDeliveriesLoaded(contextState)).toBe(false)
      })
    })
  })

  describe('getCurrentDeliverySlot', () => {
    test('should return empty object', () => {
      expect(getCurrentDeliverySlot(contextState)).toEqual({})
    })

    describe('when deliveries has currentDelvierySlot', () => {
      const currentDeliverySlot = {
        coreSlotId: '6',
        cutoffDay: 3,
        cutoffTime: '11:59:59',
        day: 'Saturday',
        defaultDay: 6,
        deliveryEndTime: '19:00:00',
        deliveryPrice: '0.00',
        deliveryStartTime: '08:00:00',
        id: 'db047c82-12345',
        isDefault: true,
        timeRange: '8am - 7pm',
        whenCutoff: '2020-11-25T11:59:59+00:00'
      }
      beforeEach(() => {
        contextState.deliveries = {
          ...contextState.deliveries,
          currentDeliverySlot,
          slots: [],
        }
      })

      test('should return currentDeliverySlot', () => {
        expect(getCurrentDeliverySlot(contextState)).toEqual(currentDeliverySlot)
      })
    })
  })
  describe('getDeliverySlots', () => {
    test('should return empty array', () => {
      expect(getDeliverySlots(contextState)).toEqual([])
    })

    describe('when deliveries has getDeliverySlots', () => {
      const slots = [{
        coreSlotId: '6',
        cutoffDay: 3,
        cutoffTime: '11:59:59',
        day: 'Saturday',
        defaultDay: 6,
        deliveryEndTime: '19:00:00',
        deliveryPrice: '0.00',
        deliveryStartTime: '08:00:00',
        id: 'db047c82-12345',
        isDefault: true,
        timeRange: '8am - 7pm',
        whenCutoff: '2020-11-25T11:59:59+00:00'
      }, {
        coreSlotId: '4',
        cutoffDay: 2,
        cutoffTime: '11:59:59',
        day: 'Friday',
        defaultDay: 5,
        deliveryEndTime: '19:00:00',
        deliveryPrice: '0.00',
        deliveryStartTime: '08:00:00',
        id: 'db015db8-12345',
        isDefault: true,
        timeRange: '8am - 7pm',
        whenCutoff: '2020-12-01T11:59:59+00:00'
      }]

      beforeEach(() => {
        contextState.deliveries = {
          ...contextState.deliveries,
          slots,
        }
      })

      test('should return slots', () => {
        expect(getDeliverySlots(contextState)).toEqual(slots)
      })
    })
  })

  describe('getDeliveryFrequency', () => {
    test('should return frequency currentValue', () => {
      expect(getDeliveryFrequency(contextState)).toEqual(1)
    })
  })
})
