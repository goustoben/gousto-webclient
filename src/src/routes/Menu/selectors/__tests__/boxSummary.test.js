import Immutable from 'immutable'
import { getOneOffSlotAvailableSlots } from '../boxSummary'

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
