import {
  reduceCurrentDeliverySlot,
  reduceDeliverySlot,
  reduceDeliveryFrequency,
  reduceDeliverySlots,
  reduceDeliveriesData,
  reduceUpdatedDeliveriesData
} from '../deliveries'

let result

const mockSubscriptionData = {
  subscription: {
    interval: '1'
  }
}

const mockSlots = [
  {
    coreSlotId: 'mock-delivery-slot-id',
    deliveryStartTime: '08:00:00',
    deliveryEndTime: '19:00:00',
    defaultDay: 1
  }, {
    coreSlotId: 'mock-delivery-slot-id-2',
    deliveryStartTime: '09:00:00',
    deliveryEndTime: '12:00:00',
    defaultDay: 2
  },
]

const mockState = {
  deliveries: {
    slots: mockSlots,
    frequency: {
      currentValue: '1'
    }
  },
  subscription: {
    deliverySlotId: 'mock-delivery-slot-id',
  }
}

const mockReducedSlots = [
  {
    coreSlotId: 'mock-delivery-slot-id',
    deliveryStartTime: '08:00:00',
    deliveryEndTime: '19:00:00',
    defaultDay: 1,
    timeRange: '8am - 7pm',
    day: 'Monday'
  }, {
    coreSlotId: 'mock-delivery-slot-id-2',
    deliveryStartTime: '09:00:00',
    deliveryEndTime: '12:00:00',
    defaultDay: 2,
    timeRange: '9am - 12pm',
    day: 'Tuesday'
  },
]

const mockDeliveryDays = [
  { id: '123', slots: [mockSlots[0]] },
  { id: '456', slots: [mockSlots[1]] },
]

const mockData = {
  deliveries: mockDeliveryDays,
  subscription: mockSubscriptionData
}

describe('deliveries reducers', () => {
  describe('reduceCurrentDeliverySlot', () => {
    describe('Given there is no subscription state', () => {
      beforeEach(() => {
        result = reduceCurrentDeliverySlot({
          initial: 'state'
        }, mockReducedSlots)
      })

      test('Then initial state is returned', () => {
        expect(result).toEqual({ initial: 'state' })
      })
    })

    describe('Given no slots are passed', () => {
      beforeEach(() => {
        result = reduceCurrentDeliverySlot(mockState)
      })

      test('Then initial state is returned', () => {
        expect(result).toEqual(mockState)
      })
    })

    describe('Given there is existing subscription state', () => {
      beforeEach(() => {
        result = reduceCurrentDeliverySlot(mockState, mockReducedSlots)
      })

      test('Then current delivery slot is reduced as expected', () => {
        expect(result).toEqual(mockReducedSlots[0])
      })
    })
  })

  describe('reduceDeliverySlot', () => {
    test('Then slot is reduced as expected', () => {
      expect(result).toEqual(mockReducedSlots[0])
    })
  })

  describe('reduceDeliveryFrequency', () => {
    describe('Given malformed subscription data is passed', () => {
      beforeEach(() => {
        result = reduceDeliveryFrequency({ foo: 'bar' })
      })

      test('Then subscription data is returned', () => {
        expect(result).toEqual({ foo: 'bar' })
      })
    })

    describe('Given no subscription data is passed', () => {
      beforeEach(() => {
        result = reduceDeliveryFrequency()
      })

      test('Then function returns nothing', () => {
        expect(result).toEqual(undefined)
      })
    })

    describe('Given subscription data is passed as expected', () => {
      beforeEach(() => {
        result = reduceDeliveryFrequency(mockSubscriptionData)
      })

      test('Then delivery frequency is reduced as expected', () => {
        expect(result).toEqual({
          currentValue: '1'
        })
      })
    })
  })

  describe('reduceDeliverySlots', () => {
    describe('Given no delivery days are passed', () => {
      const stateWithSlots = {
        ...mockState,
        deliveries: {
          slots: [mockReducedSlots[0]]
        }
      }

      beforeEach(() => {
        result = reduceDeliverySlots(stateWithSlots)
      })

      test('Then existing slots are returned', () => {
        expect(result).toEqual(stateWithSlots.deliveries.slots)
      })
    })

    describe('Given delivery days are passed', () => {
      beforeEach(() => {
        result = reduceDeliverySlots(mockState, mockDeliveryDays)
      })

      test('Then slots are reduced as expected', () => {
        expect(result).toEqual(mockReducedSlots)
      })
    })
  })

  describe('reduceDeliveriesData', () => {
    describe('Given expected params are passed', () => {
      beforeEach(() => {
        result = reduceDeliveriesData(mockState, mockData)
      })

      test('Then deliveries data is reduced as expected', () => {
        expect(result).toEqual({
          ...mockState,
          deliveries: {
            slots: mockReducedSlots,
            currentDeliverySlot: mockReducedSlots[0],
            frequency: {
              currentValue: '1'
            },
            requestState: {
              isLoaded: true,
              isLoading: false
            }
          }
        })
      })
    })
  })

  describe('reduceUpdatedDeliveriesData', () => {
    describe('Given state is passed', () => {
      beforeEach(() => {
        result = reduceUpdatedDeliveriesData({
          deliveries: {
            slots: mockReducedSlots,
            frequency: {
              currentValue: '1'
            }
          },
          subscription: {
            deliverySlotId: 'mock-delivery-slot-id-2'
          }
        }, {})
      })

      test('Then currentDeliverySlot is updated as expected', () => {
        expect(result).toEqual({
          deliveries: {
            slots: mockReducedSlots,
            currentDeliverySlot: mockReducedSlots[1],
            frequency: {
              currentValue: '1',
            },
            requestState: {
              isLoaded: true,
              isLoading: false
            }
          },
          subscription: {
            deliverySlotId: 'mock-delivery-slot-id-2',
          },
        })
      })
    })

    describe('Given updated interval is passed', () => {
      beforeEach(() => {
        result = reduceUpdatedDeliveriesData({
          deliveries: {
            slots: mockReducedSlots,
            frequency: {
              currentValue: '1'
            }
          },
          subscription: {
            deliverySlotId: 'mock-delivery-slot-id-2'
          }
        }, {
          interval: 2
        })
      })

      test('Then frequency is updated as expected', () => {
        expect(result).toEqual({
          deliveries: {
            slots: mockReducedSlots,
            currentDeliverySlot: mockReducedSlots[1],
            frequency: {
              currentValue: '2',
            },
            requestState: {
              isLoaded: true,
              isLoading: false
            }
          },
          subscription: {
            deliverySlotId: 'mock-delivery-slot-id-2',
          },
        })
      })
    })
  })
})
