import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import {
  getBasketNotValidError,
  createGetActionTypeIsPending,
  createGetErrorForActionType,
} from '../status'

describe('status selectors', () => {
  describe('given getBasketNotValidError is called', () => {
    test('then it should return BASKET_NOT_VALID error', () => {
      const state = {
        error: Immutable.Map({
          [actionTypes.BASKET_NOT_VALID]: [
            {
              name: 'rule-name',
              message: 'Only one recipe',
              items: ['123'],
            },
          ],
        }),
      }
      expect(getBasketNotValidError(state)).toEqual([
        {
          name: 'rule-name',
          message: 'Only one recipe',
          items: ['123'],
        },
      ])
    })
  })

  describe('given createGetErrorForActionType is called', () => {
    const state = {
      error: Immutable.Map({
        [actionTypes.ORDER_SAVE]: 'unknown-error',
        [actionTypes.BASKET_NOT_VALID]: [
          {
            name: 'rule-name',
          },
        ],
      }),
    }

    test('then it should return a selector that when called, extracts the proper error', () => {
      expect(createGetErrorForActionType(actionTypes.BASKET_NOT_VALID)(state)).toEqual([
        { name: 'rule-name' },
      ])
      expect(createGetErrorForActionType(actionTypes.ORDER_SAVE)(state)).toEqual('unknown-error')
    })
  })

  describe('given createGetActionTypeIsPending is called', () => {
    const state = {
      pending: Immutable.Map({
        [actionTypes.PROMO_GET]: false,
        [actionTypes.BASKET_CHECKOUT]: true,
      }),
    }

    test('then it should return a selector that when called, extracts the proper "pending" value', () => {
      expect(createGetActionTypeIsPending(actionTypes.PROMO_GET)(state)).toBe(false)
      expect(createGetActionTypeIsPending(actionTypes.BASKET_CHECKOUT)(state)).toBe(true)
    })
  })
})
