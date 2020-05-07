import Immutable, { fromJS } from 'immutable'
import { getOneOffSlotAvailableSlots, getDisabledSlots, userHasAvailableSlots } from '../boxSummary'

describe('given getOneOffSlotAvailableSlots is called', () => {
  describe('and there is available active slots', () => {
    let expected

    beforeEach(() => {
      const state = {
        user: Immutable.fromJS({
          subscription: {
            state: 'active'
          }
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2020-04-19': {
            daySlots: [{
              activeForNonSubscribersOneOff: false,
              activeForSubscribersOneOff: false,
            }],
          },
          '2020-04-20': {
            daySlots: [{
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            }],
          }
        })
      }

      expected = getOneOffSlotAvailableSlots(state)
    })

    test('returns the days with active slots', () => {
      expect(expected).toEqual(
        Immutable.fromJS({
          '2020-04-20': {
            daySlots: [{
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            }],
          }
        })
      )
    })
  })

  describe('and there is no available active slots', () => {
    let expected

    beforeEach(() => {
      const state = {
        user: Immutable.fromJS({
          subscription: {
            state: 'active'
          }
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2020-04-19': {
            daySlots: [{
              activeForNonSubscribersOneOff: false,
              activeForSubscribersOneOff: false,
            }],
          },
          '2020-04-20': {
            daySlots: [{
              activeForNonSubscribersOneOff: false,
              activeForSubscribersOneOff: false,
            }],
          }
        })
      }

      expected = getOneOffSlotAvailableSlots(state)
    })

    test('returns empty', () => {
      expect(expected).toEqual(
        Immutable.fromJS({})
      )
    })
  })
})

describe('given the getDisabledSlots is called', () => {
  let expected

  beforeEach(() => {
    const state = {
      user: Immutable.fromJS({
        subscription: {
          state: 'active'
        },
        orders: [],
      }),
      boxSummaryDeliveryDays: Immutable.fromJS({
        '2020-04-19': {
          date: '2020-04-19',
          daySlots: [{
            slotId: 'slot-id-1',
            activeForNonSubscribersOneOff: true,
            activeForSubscribersOneOff: true,
          }],
          slots: [{
            id: 'slot-id-1',
          }]
        },
        '2020-04-20': {
          date: '2020-04-20',
          daySlots: [{
            slotId: 'slot-id-2',
            activeForNonSubscribersOneOff: false,
            activeForSubscribersOneOff: false,
          }],
          slots: [{
            id: 'slot-id-2',
          }]
        }
      })
    }

    expected = getDisabledSlots(state)
  })

  test('returns the disabled slot', () => {
    expect(expected).toEqual(fromJS([{
      id: 'slot-id-2',
      date: '2020-04-20',
    }]))
  })
})

describe('given the userHasAvailableSlots is called', () => {
  const DISABLED_SLOTS = {
    '2020-04-19': {
      date: '2020-04-19',
      daySlots: [{
        slotId: 'slot-id-1',
        activeForNonSubscribersOneOff: false,
        activeForSubscribersOneOff: false,
      }],
      slots: [{
        id: 'slot-id-1',
      }]
    },
    '2020-04-20': {
      date: '2020-04-20',
      daySlots: [{
        slotId: 'slot-id-2',
        activeForNonSubscribersOneOff: false,
        activeForSubscribersOneOff: false,
      }],
      slots: [{
        id: 'slot-id-2',
      }]
    }
  }
  const ACTIVE_SLOTS = {
    '2020-04-19': {
      date: '2020-04-19',
      daySlots: [{
        slotId: 'slot-id-1',
        activeForNonSubscribersOneOff: true,
        activeForSubscribersOneOff: true,
      }],
      slots: [{
        id: 'slot-id-1',
      }]
    },
    '2020-04-20': {
      date: '2020-04-20',
      daySlots: [{
        slotId: 'slot-id-2',
        activeForNonSubscribersOneOff: false,
        activeForSubscribersOneOff: false,
      }],
      slots: [{
        id: 'slot-id-2',
      }]
    },
    '2020-04-21': {
      date: '2020-04-21',
      daySlots: [{
        slotId: 'slot-id-3',
        activeForNonSubscribersOneOff: true,
        activeForSubscribersOneOff: true,
      }],
      slots: [{
        id: 'slot-id-3',
      }]
    }
  }
  const OPEN_ORDER = {
    'order-id-1': {
      phase: 'open'
    }
  }

  describe('when all transaction slots are disabled but user has subscription active', () => {
    let expected

    beforeEach(() => {
      const state = {
        user: Immutable.fromJS({
          subscription: {
            state: 'active'
          },
          orders: Immutable.fromJS(OPEN_ORDER),
        }),
        boxSummaryDeliveryDays: Immutable.fromJS(DISABLED_SLOTS)
      }

      expected = userHasAvailableSlots(state)
    })

    test('userHasAvailableSlots returns true', () => {
      expect(expected).toBe(true)
    })
  })

  describe('when all slots are disabled', () => {
    let expected

    beforeEach(() => {
      const state = {
        user: Immutable.fromJS({
          subscription: {
            state: 'active'
          },
          orders: Immutable.fromJS({}),
        }),
        boxSummaryDeliveryDays: Immutable.fromJS(DISABLED_SLOTS)
      }

      expected = userHasAvailableSlots(state)
    })

    test('userHasAvailableSlots returns false', () => {
      expect(expected).toBe(false)
    })
  })

  describe('when there are active slots', () => {
    let expected

    beforeEach(() => {
      const state = {
        user: Immutable.fromJS({
          subscription: {
            state: 'active'
          },
          orders: Immutable.fromJS({}),
        }),
        boxSummaryDeliveryDays: Immutable.fromJS(ACTIVE_SLOTS)
      }

      expected = userHasAvailableSlots(state)
    })

    test('userHasAvailableSlots returns true', () => {
      expect(expected).toBe(true)
    })
  })
})
