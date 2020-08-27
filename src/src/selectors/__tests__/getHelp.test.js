import { fromJS, Map } from 'immutable'
import {
  getRecipesForGetHelp,
  getDaysSinceLastCompensation,
  getOrderId,
} from '../getHelp'

describe('getHelp', () => {
  describe('the getRecipesForGetHelp selector', () => {
    let state
    const RECIPES = [
      { id: '1', ingredients: [{ id: '1', label: 'First ingredient' }], title: 'First recipe' },
      { id: '2', ingredients: [{ id: '2', label: 'Second ingredient' }], title: 'Second recipe' },
    ]

    beforeEach(() => {
      state = {
        getHelp: fromJS({
          recipes: RECIPES
        })
      }
    })

    test('returns the recipes from the getHelp state as a JS array', () => {
      expect(getRecipesForGetHelp(state)).toEqual(RECIPES)
    })
  })

  describe('the getDaysSinceLastRefund selector', () => {
    let state

    beforeEach(() => {
      state = {
        error: Map(({
          GET_HELP_VALIDATE_ORDER: {
            errors: {
              criteria: {
                daysSinceLastCompensation: 2
              }
            }
          }
        }))
      }
    })

    test('days since last refund is returned when validation has failed', () => {
      expect(getDaysSinceLastCompensation(state)).toEqual(2)
    })
  })
})

describe('the getOrderId selector', () => {
  let state

  const ORDER_ID = '12345'

  beforeEach(() => {
    state = {
      getHelp: Map({
        order: Map({
          id: ORDER_ID,
        }),
      }),
    }
  })

  test('returns the order ID', () => {
    expect(getOrderId(state)).toEqual(ORDER_ID)
  })
})
