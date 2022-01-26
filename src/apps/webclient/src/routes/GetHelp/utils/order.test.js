import Immutable from 'immutable'
import moment from 'moment'
import { getClientOrderState } from './orders'

jest.mock('moment')

describe('getClientOrderState', () => {
  let phase
  let state
  let deliveryDate
  let recipeItems
  const EMPTY_RECIPE_ITEMS = Immutable.List()
  const RECIPE_ITEMS = Immutable.List(['item1', 'item2'])

  beforeEach(() => {
    phase = 'whatever phase'
    state = 'whatever state'
    deliveryDate = '2021-07-08T00:00:00.000Z'
    recipeItems = EMPTY_RECIPE_ITEMS
    moment.mockReturnValue({
      isSame: () => 'irrelevant'
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when phase is pre-menu', () => {
    beforeEach(() => {
      phase = 'pre_menu'
    })

    test('returns scheduled', () => {
      expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe('scheduled')
    })
  })

  describe('when state is committed', () => {
    beforeEach(() => {
      state = 'committed'
    })

    describe('and delivery day is today', () => {
      beforeEach(() => {
        moment.mockReturnValue({
          isSame: () => true
        })
      })

      test('returns dispatched', () => {
        expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe('dispatched')
      })
    })

    describe('and delivery day is not today', () => {
      beforeEach(() => {
        moment.mockReturnValue({
          isSame: () => false
        })
      })

      test('returns confirmed', () => {
        expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe('confirmed')
      })
    })
  })

  describe('when state is pending', () => {
    beforeEach(() => {
      state = 'pending'
    })

    describe('and phase is not awaiting_choices nor open', () => {
      beforeEach(() => {
        phase = 'not awaiting_choices and not open'
      })

      test('returns confirmed', () => {
        expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe('confirmed')
      })
    })

    describe('and there are no recipeItems', () => {
      beforeEach(() => {
        recipeItems = EMPTY_RECIPE_ITEMS
      })

      describe('and phase is awaiting_choices', () => {
        beforeEach(() => {
          phase = 'awaiting_choices'
        })

        test('returns menu open', () => {
          expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe('menu open')
        })
      })

      describe('and phase is open', () => {
        beforeEach(() => {
          phase = 'open'
        })

        test('returns menu open', () => {
          expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe('menu open')
        })
      })
    })

    describe('and there are recipeItems', () => {
      beforeEach(() => {
        recipeItems = RECIPE_ITEMS
      })

      describe('and phase is awaiting_choices', () => {
        beforeEach(() => {
          phase = 'awaiting_choices'
        })

        test('returns recipes chosen', () => {
          expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe('recipes chosen')
        })
      })

      describe('and phase is open', () => {
        beforeEach(() => {
          phase = 'open'
        })

        test('returns recipes chosen', () => {
          expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe('recipes chosen')
        })
      })
    })
  })

  describe('in other cases', () => {
    const STATE = 'not committed, not pending'

    beforeEach(() => {
      state = STATE
      phase = 'not pre_menu'
    })

    test('returns the state', () => {
      expect(getClientOrderState(state, deliveryDate, recipeItems, phase)).toBe(STATE)
    })
  })
})
