import { fromJS, Map } from 'immutable'
import {
  getIsOrderValidationError,
  getOrderId,
  getRecipesForGetHelp,
} from '../getHelp'

describe('getHelp selectors', () => {
  describe('getRecipesForGetHelp', () => {
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

  describe('getIsOrderValidationError', () => {
    let state

    describe('when GET_HELP_VALIDATE_ORDER errored', () => {
      beforeEach(() => {
        state = {
          error: Map(({
            GET_HELP_VALIDATE_ORDER: {
              errors: {
                anyCriteria: 'any error'
              }
            }
          }))
        }
      })

      test('returns true', () => {
        expect(getIsOrderValidationError(state)).toEqual(true)
      })
    })

    describe('when GET_HELP_VALIDATE_ORDER did not errored', () => {
      beforeEach(() => {
        state = {
          error: Map(({
            GET_HELP_VALIDATE_ORDER: null,
          }))
        }
      })

      test('returns false', () => {
        expect(getIsOrderValidationError(state)).toEqual(false)
      })
    })

    describe('when GET_HELP_VALIDATE_ORDER did not happened', () => {
      beforeEach(() => {
        state = {
          error: Map(({}))
        }
      })

      test('returns false', () => {
        expect(getIsOrderValidationError(state)).toEqual(false)
      })
    })
  })

  describe('getOrderId', () => {
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
})
