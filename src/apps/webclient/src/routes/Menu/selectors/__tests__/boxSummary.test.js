import Immutable, { fromJS } from 'immutable'
import { getOneOffSlotAvailableSlots, getDisabledSlots, userHasAvailableSlots } from '../boxSummary'

describe('given getOneOffSlotAvailableSlots is called', () => {
  describe('when customer is logged in', () => {
    describe('and there is available active slots', () => {
      let expected

      beforeEach(() => {
        const state = {
          auth: Immutable.fromJS({
            isAuthenticated: true
          }),
          user: Immutable.fromJS({
            subscription: {
              state: 'active'
            }
          }),
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2020-04-19': {
              daySlots: [{
                activeForSignups: false,
                activeForNonSubscribersOneOff: false,
                activeForSubscribersOneOff: false,
              },
              {
                activeForSignups: true,
                activeForNonSubscribersOneOff: true,
                activeForSubscribersOneOff: true,
              }],
            },
            '2020-04-20': {
              daySlots: [{
                activeForSignups: true,
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
            '2020-04-19': {
              daySlots: [
                {
                  activeForSignups: false,
                  activeForNonSubscribersOneOff: false,
                  activeForSubscribersOneOff: false,
                },{
                  activeForSignups: true,
                  activeForNonSubscribersOneOff: true,
                  activeForSubscribersOneOff: true,
                }
              ],
            },
            '2020-04-20': {
              daySlots: [{
                activeForSignups: true,
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
          auth: Immutable.fromJS({
            isAuthenticated: true
          }),
          user: Immutable.fromJS({
            subscription: {
              state: 'active'
            }
          }),
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2020-04-19': {
              daySlots: [{
                activeForSignups: false,
                activeForNonSubscribersOneOff: false,
                activeForSubscribersOneOff: false,
              },
              {
                activeForSignups: false,
                activeForNonSubscribersOneOff: false,
                activeForSubscribersOneOff: false,
              }],
            },
            '2020-04-20': {
              daySlots: [{
                activeForSignups: false,
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

    describe('and subscription is set to inactive', () => {
      let expected

      beforeEach(() => {
        const state = {
          auth: Immutable.fromJS({
            isAuthenticated: true
          }),
          user: Immutable.fromJS({
            subscription: {
              state: 'inactive'
            }
          }),
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2020-04-19': {
              daySlots: [{
                activeForNonSubscribersOneOff: true,
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

      test('returns available slot', () => {
        expect(expected).toEqual(
          Immutable.fromJS({
            '2020-04-19': {
              daySlots: [{
                activeForNonSubscribersOneOff: true,
                activeForSubscribersOneOff: false,
              }],
            }
          })
        )
      })
    })
  })

  describe('when a customer is not logged in', () => {
    describe('and there are available slots', () => {
      let expected

      beforeEach(() => {
        const state = {
          auth: Immutable.fromJS({
            isAuthenticated: false
          }),
          user: Immutable.fromJS({}),
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2020-04-19': {
              daySlots: [{
                activeForNonSubscribersOneOff: false,
                activeForSubscribersOneOff: false,
                activeForSignups: true,
              }],
            },
            '2020-04-20': {
              daySlots: [{
                activeForNonSubscribersOneOff: true,
                activeForSubscribersOneOff: true,
                activeForSignups: false,
              },
              {
                activeForNonSubscribersOneOff: true,
                activeForSubscribersOneOff: true,
                activeForSignups: false,
              }],
            }
          })
        }

        expected = getOneOffSlotAvailableSlots(state)
      })

      test('returns the days with active slots', () => {
        expect(expected).toEqual(
          Immutable.fromJS({
            '2020-04-19': {
              daySlots: [{
                activeForNonSubscribersOneOff: false,
                activeForSubscribersOneOff: false,
                activeForSignups: true,
              }],
            }
          })
        )
      })
    })

    describe('and there are no available slots', () => {
      let expected

      beforeEach(() => {
        const state = {
          auth: Immutable.fromJS({
            isAuthenticated: false
          }),
          user: Immutable.fromJS({}),
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2020-04-19': {
              daySlots: [{
                activeForNonSubscribersOneOff: false,
                activeForSubscribersOneOff: false,
                activeForSignups: false,
              },
              {
                activeForNonSubscribersOneOff: false,
                activeForSubscribersOneOff: false,
                activeForSignups: false,
              }],
            },
            '2020-04-20': {
              daySlots: [{
                activeForNonSubscribersOneOff: false,
                activeForSubscribersOneOff: false,
                activeForSignups: false,
              }],
            }
          })
        }

        expected = getOneOffSlotAvailableSlots(state)
      })

      test('returns the days with active slots', () => {
        expect(expected).toEqual(
          Immutable.fromJS({})
        )
      })
    })
  })
})

describe('given the getDisabledSlots is called', () => {
  let expected
  let state
  const OPEN_ORDER = {
    'order-id-1': {
      phase: 'open'
    }
  }

  beforeEach(() => {
    state = {
      auth: Immutable.fromJS({
        isAuthenticated: true
      }),
      user: Immutable.fromJS({
        subscription: {
          state: 'active'
        },
        orders: [
          OPEN_ORDER,
        ],
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

  describe('when getDisabledSlots is called with multiple daySlots and only one is disabled', () => {
    beforeEach(() => {
      state = {
        ...state,
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2020-04-19': {
            date: '2020-04-19',
            daySlots: [{
              slotId: 'slot-id-1',
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            },
            {
              slotId: 'slot-id-1b',
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            }],
            slots: [{
              id: 'slot-id-1',
            },{
              id: 'slot-id-1b',
            }]
          },
          '2020-04-20': {
            date: '2020-04-20',
            daySlots: [{
              slotId: 'slot-id-2',
              activeForNonSubscribersOneOff: false,
              activeForSubscribersOneOff: false,
            },{
              slotId: 'slot-id-2b',
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            }],
            slots: [{
              id: 'slot-id-2',
            },{
              id: 'slot-id-2b',
            }]
          }
        })
      }

      expected = getDisabledSlots(state)
    })

    test('returns the disabled slots correctly', () => {
      expect(expected).toEqual(fromJS([{
        id: 'slot-id-2',
        date: '2020-04-20',
      }]))
    })
  })

  describe('when getDisabledSlots is called with multiple daySlots and none are disabled', () => {
    beforeEach(() => {
      state = {
        ...state,
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2020-04-19': {
            date: '2020-04-19',
            daySlots: [{
              slotId: 'slot-id-1',
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            },
            {
              slotId: 'slot-id-1b',
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            }],
            slots: [{
              id: 'slot-id-1',
            },{
              id: 'slot-id-1b',
            }]
          },
          '2020-04-20': {
            date: '2020-04-20',
            daySlots: [{
              slotId: 'slot-id-2',
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            },{
              slotId: 'slot-id-2b',
              activeForNonSubscribersOneOff: true,
              activeForSubscribersOneOff: true,
            }],
            slots: [{
              id: 'slot-id-2',
            },{
              id: 'slot-id-2b',
            }]
          }
        })
      }

      expected = getDisabledSlots(state)
    })

    test('returns the disabled slots correctly', () => {
      expect(expected).toEqual(fromJS([]))
    })
  })

  describe('when getDisabledSlots is called with multiple daySlots and all are disabled', () => {
    beforeEach(() => {
      state = {
        ...state,
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2020-04-19': {
            date: '2020-04-19',
            daySlots: [{
              slotId: 'slot-id-1',
              activeForNonSubscribersOneOff: false,
              activeForSubscribersOneOff: false,
            },
            {
              slotId: 'slot-id-1b',
              activeForNonSubscribersOneOff: false,
              activeForSubscribersOneOff: false,
            }],
            slots: [{
              id: 'slot-id-1',
            },{
              id: 'slot-id-1b',
            }]
          },
          '2020-04-20': {
            date: '2020-04-20',
            daySlots: [{
              slotId: 'slot-id-2',
              activeForNonSubscribersOneOff: false,
              activeForSubscribersOneOff: false,
            },{
              slotId: 'slot-id-2b',
              activeForNonSubscribersOneOff: false,
              activeForSubscribersOneOff: false,
            }],
            slots: [{
              id: 'slot-id-2',
            },{
              id: 'slot-id-2b',
            }]
          }
        })
      }

      expected = getDisabledSlots(state)
    })

    test('returns the disabled slots correctly', () => {
      expect(expected).toEqual(fromJS([
        {
          id: 'slot-id-1',
          date: '2020-04-19',
        },
        {
          id: 'slot-id-1b',
          date: '2020-04-19',
        },
        {
          id: 'slot-id-2',
          date: '2020-04-20',
        },
        {
          id: 'slot-id-2b',
          date: '2020-04-20',
        },
      ]))
    })
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
        auth: Immutable.fromJS({
          isAuthenticated: true
        }),
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
        auth: Immutable.fromJS({
          isAuthenticated: true
        }),
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
        auth: Immutable.fromJS({
          isAuthenticated: true
        }),
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
