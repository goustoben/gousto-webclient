import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import config from 'config'
import basketReducer from 'reducers/basket'
import * as basketActions from 'actions/basket'
import logger from 'utils/logger'

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

describe('basket reducer', () => {
  const { basket } = basketReducer
  let initialState

  beforeEach(() => {
    initialState = Immutable.fromJS({
      address: null,
      addressTypeEdited: false,
      collection: '',
      chosenAddress: null,
      currentMenuId: '',
      date: '',
      gifts: {},
      limitReached: false,
      numAdults: 0,
      numPortions: 2,
      orderId: '',
      postcode: '',
      prevDate: '',
      prevPostcode: '',
      prevSlotId: '',
      prevAddress: null,
      previewOrder: {},
      products: {},
      promoCode: '',
      promoCodeApplied: false,
      promoCodeUrl: '',
      recipes: {},
      slotId: '',
      unsaved: false,
      previewOrderId: '',
      stepsOrder: [],
      tariffId: null,
      subscriptionOption: 'subscription',
      surcharges: Immutable.List(),
    })
  })

  test('should handle initial state', () => {
    expect(Immutable.is(basket(undefined, {}), initialState)).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = Immutable.Map({ date: '2016-02-23' })

    const result = basket(state, { type: 'unknown' })

    expect(Immutable.is(result, state)).toEqual(true)
  })

  describe('BASKET_DATE_CHANGE action type', () => {
    test('should put date into the state if valid format', () => {
      const state = Immutable.Map({ date: '' })
      const result = basket(state, { type: 'BASKET_DATE_CHANGE', date: '2016-08-09', menuId: '123' })
      const expected = Immutable.Map({ date: '2016-08-09', currentMenuId: '123' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
    test('should put the current date into the prevDate state', () => {
      const state = Immutable.Map({ prevDate: null, date: '2016-08-09' })
      const result = basket(state, { type: 'BASKET_DATE_CHANGE', date: '2016-10-09', menuId: '123' })
      const expected = Immutable.Map({ prevDate: '2016-08-09', date: '2016-10-09', currentMenuId: '123' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })

    test('should not put the current date into the prevDate state if the current date is blank', () => {
      const state = Immutable.Map({ date: '' })
      const result = basket(state, { type: 'BASKET_DATE_CHANGE', date: '2016-10-09', menuId: '123' })
      const expected = Immutable.Map({ date: '2016-10-09', currentMenuId: '123' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_GIFT_ADD action type', () => {
    test('should increment count for gift id in gifts list by 1', () => {
      const action = {
        type: actionTypes.BASKET_GIFT_ADD,
        giftId: '123',
      }

      initialState = Immutable.Map({
        gifts: Immutable.Map({ 123: 2 }),
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, Immutable.fromJS({ gifts: { 123: 3 } }))).toEqual(true)
    })

    test('should add gift id to gifts list as 1 if gift not yet present in list', () => {
      const action = {
        type: actionTypes.BASKET_GIFT_ADD,
        giftId: '123',
      }

      initialState = Immutable.Map({
        gifts: Immutable.Map({}),
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, Immutable.fromJS({ gifts: { 123: 1 } }))).toEqual(true)
    })
  })

  describe('BASKET_NUM_PORTION_CHANGE action type', () => {
    test('should put num portions into the state if valid', () => {
      const state = Immutable.Map({ numPortions: '' })
      const result = basket(state, { type: 'BASKET_NUM_PORTION_CHANGE', numPortions: '4' })
      const expected = Immutable.Map({ numPortions: 4 })

      expect(Immutable.is(result, expected)).toEqual(true)
    })

    test('should not put num portions into the state if invalid, and fallback to default', () => {
      const state = Immutable.Map({ numPortions: '' })
      const errorSpy = jest.spyOn(logger, 'error')

      const result = basketReducer.basket(state, { type: 'BASKET_NUM_PORTION_CHANGE', numPortions: 'invalid-portion-size' })
      const expected = Immutable.Map({ numPortions: config.basket.portions.default })

      expect(errorSpy.mock.calls).toHaveLength(1)
      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_NUM_PEOPLE_CHANGE action type', () => {
    const data = [
      { adults: 1, expected: 2 },
      { adults: 2, expected: 2 },
      { adults: 3, expected: 4 },
      { adults: 4, expected: 4 },
      { adults: 5, expected: 4 },
    ]

    data.forEach((line) => {
      test(`should set numPortions to ${line.expected} with ${line.adults} adults`, () => {
        const state = Immutable.Map({ numAdults: '' })
        const result = basket(state, { type: 'BASKET_NUM_PEOPLE_CHANGE', people: { numAdults: line.adults } })
        const expected = Immutable.Map({ numAdults: line.adults, numPortions: line.expected })
        expect(Immutable.is(result, expected)).toEqual(true)
      })
    })
  })

  describe('BASKET_POSTCODE_CHANGE action type', () => {
    test('should put the given postcode into the state', () => {
      const state = Immutable.Map({ postcode: '' })
      const result = basket(state, { type: 'BASKET_POSTCODE_CHANGE', postcode: 'w3 7un' })
      const expected = Immutable.Map({ postcode: 'w3 7un' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })

    test('should put the current postcode into the prevPostcode property of the state', () => {
      const state = Immutable.Map({ postcode: '' })
      let result = basket(state, { type: 'BASKET_POSTCODE_CHANGE', postcode: 'w3 7un' })
      let expected = Immutable.Map({ postcode: 'w3 7un' })

      expect(Immutable.is(result, expected)).toEqual(true)

      result = basket(result, { type: 'BASKET_POSTCODE_CHANGE', postcode: 'ct1 3sa' })
      expected = Immutable.Map({ postcode: 'ct1 3sa', prevPostcode: 'w3 7un' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })

    test('should not put the current postcode into the prevPostcode property of the state if the previous postcode is blank', () => {
      const state = Immutable.Map({ postcode: '' })
      const result = basket(state, { type: 'BASKET_POSTCODE_CHANGE', postcode: 'w3 7un' })
      const expected = Immutable.Map({ postcode: 'w3 7un' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_PRODUCT_ADD action type', () => {
    test('should increment count for product id in products list by 1', () => {
      const action = {
        type: actionTypes.BASKET_PRODUCT_ADD,
        productId: '123',
      }

      initialState = Immutable.fromJS({ products: { 123: 2 } })
      const result = basket(initialState, action)

      expect(Immutable.is(result, Immutable.fromJS({ products: { 123: 3 } }))).toEqual(true)
    })

    test('should add product id to products list as 1 if product not yet present in list', () => {
      const action = {
        type: actionTypes.BASKET_PRODUCT_ADD,
        productId: '123',
      }

      initialState = Immutable.Map({
        products: Immutable.Map({}),
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, Immutable.fromJS({ products: { 123: 1 } }))).toEqual(true)
    })
  })

  describe('BASKET_PRODUCT_REMOVE action type', () => {
    test('should decrement count for product id in products list by 1', () => {
      const action = {
        type: actionTypes.BASKET_PRODUCT_REMOVE,
        productId: '123',
      }

      initialState = Immutable.Map({
        products: Immutable.Map({ 123: 2 }),
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, Immutable.fromJS({ products: { 123: 1 } }))).toEqual(true)
    })

    test('should delete product from product list if new count is 0', () => {
      const action = {
        type: actionTypes.BASKET_PRODUCT_REMOVE,
        productId: '123',
      }

      initialState = Immutable.Map({
        products: Immutable.Map({ 123: 1 }),
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, Immutable.fromJS({ products: {} }))).toEqual(true)
    })
  })

  describe('BASKET_PROMO_CODE_CHANGE action type', () => {
    test('should save and uppercase new promo code', () => {
      const state = Immutable.Map({ promoCode: '' })
      const result = basket(state, { type: 'BASKET_PROMO_CODE_CHANGE', promoCode: 'hooray' })
      const expected = Immutable.Map({ promoCode: 'HOORAY' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_PROMO_CODE_URL_CHANGE action type', () => {
    test('should save new promo code', () => {
      const state = Immutable.Map({ promoCodeUrl: '' })
      const result = basket(state, { type: 'BASKET_PROMO_CODE_URL_CHANGE', promoCodeUrl: 'hooray' })
      const expected = Immutable.Map({ promoCodeUrl: 'hooray' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_PROMO_CODE_APPLIED_CHANGE action type', () => {
    test('should save new promo code', () => {
      const state = Immutable.Map({ promoCodeApplied: true })
      const result = basket(state, { type: 'BASKET_PROMO_CODE_APPLIED_CHANGE', promoCodeApplied: true })
      const expected = Immutable.Map({ promoCodeApplied: true })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_RECIPES_INITIALISE action type', () => {
    describe('given an initial state with recipes', () => {
      beforeEach(() => {
        initialState = Immutable.Map({
          recipes: Immutable.Map({ 345: 3 }),
          other: 'data'
        })
      })

      describe('when reducer is passed `BASKET_RECIPES_INITIALISE` action', () => {
        let result
        const recipes = { 123: 1, 234: 2 }

        beforeEach(() => {
          const action = {
            type: actionTypes.BASKET_RECIPES_INITIALISE,
            recipes,
          }

          result = basket(initialState, action)
        })

        test('then the new state should overwrite the recipes', () => {
          const expectedState = Immutable.Map({
            recipes: Immutable.Map(recipes),
            other: 'data'
          })

          expect(Immutable.is(result, expectedState)).toBeTruthy()
        })
      })
    })
  })

  describe('BASKET_RECIPE_ADD action type', () => {
    test('should put recipe in recipes list if incrementing and WAS NOT there before', () => {
      const action = {
        type: actionTypes.BASKET_RECIPE_ADD,
        recipeId: '123',
      }

      initialState = Immutable.Map({
        recipes: Immutable.Map({}),
      })
      const expected = Immutable.Map({
        recipes: Immutable.Map({
          123: 1
        })
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, expected)).toBeTruthy()
    })

    test('should put recipe in recipes list if incrementing and WAS there before', () => {
      const action = {
        type: actionTypes.BASKET_RECIPE_ADD,
        recipeId: '123',
      }

      initialState = Immutable.Map({
        recipes: Immutable.Map({ 123: 2 }),
      })
      const expected = Immutable.Map({
        recipes: Immutable.Map({ 123: 3 }),
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, expected)).toBeTruthy()
    })
  })

  describe('BASKET_LIMIT_REACHED action type', () => {
    test('should set state limitReached to dispatched action', () => {
      const action = {
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: true,
      }

      initialState = Immutable.Map({
        limitReached: false,
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, Immutable.Map({
        limitReached: true,
      }))).toEqual(true)
    })
  })

  describe('BASKET_RECIPE_REMOVE action type', () => {
    test('should decrement qty if has more than 1 in basket', () => {
      const action = {
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
      }

      initialState = Immutable.Map({
        recipes: Immutable.Map({ 123: 3 }),
      })

      const result = basket(initialState, action)

      expect(Immutable.is(result, Immutable.Map({
        recipes: Immutable.Map({ 123: 2 }),
      }))).toEqual(true)
    })

    test('should remove recipe from object if qty reaches 0', () => {
      const action = {
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
      }

      initialState = Immutable.Map({
        recipes: Immutable.Map({ 123: 1, 456: 3 }),
      })

      const result = basket(initialState, action)
      expect(Immutable.is(result, Immutable.Map({ recipes: Immutable.Map({ 456: 3 }) }))).toEqual(true)
    })

    test('should not allow to have negative number of recipes in basket', () => {
      const action = {
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
      }

      initialState = Immutable.Map({
        recipes: Immutable.Map({ 456: 3 }),
      })

      const result = basket(initialState, action)
      expect(Immutable.is(result, Immutable.Map({ recipes: Immutable.Map({ 456: 3 }) }))).toEqual(true)
    })
  })

  describe('BASKET_SLOT_CHANGE action type', () => {
    test('should put the given slotId into the state', () => {
      const state = Immutable.Map({ slotId: '' })
      const result = basket(state, { type: 'BASKET_SLOT_CHANGE', slotId: 'slot-123' })
      const expected = Immutable.Map({ slotId: 'slot-123' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })

    test('should put the previous slotId into the prevSlotId property of the state', () => {
      const state = Immutable.Map({ slotId: '' })
      let result = basket(state, { type: 'BASKET_SLOT_CHANGE', slotId: 'slot-123' })
      let expected = Immutable.Map({ slotId: 'slot-123' })

      expect(Immutable.is(result, expected)).toEqual(true)

      result = basket(result, { type: 'BASKET_SLOT_CHANGE', slotId: 'slot-456' })
      expected = Immutable.Map({ slotId: 'slot-456', prevSlotId: 'slot-123' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })

    test('should not put the previous slotId into the prevSlotId property of the state if the slotId was blank', () => {
      const state = Immutable.Map({ slotId: '' })
      const result = basket(state, { type: 'BASKET_SLOT_CHANGE', slotId: 'slot-123' })
      const expected = Immutable.Map({ slotId: 'slot-123' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_ID_CHANGE action type', () => {
    test('should empty the basket and set the basket limit reached to false', () => {
      const state = Immutable.fromJS({
        orderId: '',
      })
      const result = basket(state, { type: 'BASKET_ID_CHANGE', orderId: 'order123' })
      const expected = Immutable.fromJS({ orderId: 'order123' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_PREVIEW_ORDER_CHANGE action type', () => {
    test('should put the given preview order id into the state', () => {
      const state = Immutable.fromJS({
        previewOrderId: '',
        boxId: '',
      })
      const result = basket(state, { type: 'BASKET_PREVIEW_ORDER_CHANGE', previewOrderId: '152', boxId: '12', surcharges: [], })
      const expected = Immutable.fromJS({ previewOrderId: '152', boxId: '12', surcharges: [], })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_ADDRESS_CHANGE action type', () => {
    test('should put the given address into the state', () => {
      const state = Immutable.Map({ address: null })
      const address = Immutable.Map({ address: { id: '123-123-123-uuid', postcode: 'w30df', name: 'home' } })
      const result = basket(state, { type: 'BASKET_ADDRESS_CHANGE', address })
      const expected = Immutable.Map({ prevAddress: null, address })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_STEPS_ORDER_RECEIVE action type', () => {
    test('should put the given steps order into the state', () => {
      const state = Immutable.Map({})
      const stepsOrder = Immutable.List(['summary', 'aboutyou', 'delivery'])
      const result = basket(state, { type: 'BASKET_STEPS_ORDER_RECEIVE', stepsOrder })
      const expected = Immutable.Map({ stepsOrder })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_CHOSEN_ADDRESS_CHANGE action type', () => {
    test('should put the given chosen address into the state', () => {
      const state = Immutable.Map({ chosenAddress: null })
      const address = Immutable.Map({ address: { id: '123-123-123-uuid', postcode: 'w30df', name: 'home' } })
      const result = basket(state, { type: 'BASKET_CHOSEN_ADDRESS_CHANGE', address })
      const expected = Immutable.Map({ chosenAddress: address })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })

  describe('BASKET_RESET action type', () => {
    test('should return the basket to its initial state', () => {
      const address = Immutable.Map({ address: { id: '123-123-123-uuid', postcode: 'w30df', name: 'home' } })
      const state = Immutable.Map({ prevAddress: null, address })
      const action = basketActions.basketReset()
      const result = basket(state, action)

      expect(Immutable.is(result, initialState)).toEqual(true)
    })

    describe('when chosenAddress provided', () => {
      test('should set chosenAddress correctly in state', () => {
        const chosenAddress = Immutable.Map({ id: '1234567' })

        const action = basketActions.basketReset(chosenAddress)
        const result = basket(initialState, action)
        const resultChosenAddress = result.get('chosenAddress')

        expect(Immutable.is(resultChosenAddress, chosenAddress)).toEqual(true)
      })
    })
  })

  describe('BASKET_TARIFF_CHANGE action type', () => {
    test('should set tariffId in the state to action tariffId', () => {
      const state = Immutable.Map({ tariffId: null })
      const result = basket(state, {
        type: actionTypes.BASKET_TARIFF_CHANGE,
        tariffId: 'some new tariff',
      })
      const expected = Immutable.Map({ tariffId: 'some new tariff' })

      expect(Immutable.is(result, expected)).toEqual(true)

      const state2 = Immutable.Map({ tariffId: 'something-else' })
      const result2 = basket(state2, {
        type: actionTypes.BASKET_TARIFF_CHANGE,
        tariffId: null,
      })
      const expected2 = Immutable.Map({ tariffId: null })

      expect(Immutable.is(result2, expected2)).toEqual(true)
    })
  })

  describe('BASKET_SIGNUP_COLLECTION_RECEIVE action type', () => {
    test('should save collection', () => {
      const state = Immutable.Map({ collection: '' })
      const result = basket(state, { type: 'BASKET_SIGNUP_COLLECTION_RECEIVE', collection: '1234567' })
      const expected = Immutable.Map({ collection: '1234567' })

      expect(Immutable.is(result, expected)).toEqual(true)
    })
  })
})
