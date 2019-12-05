import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import menu from 'reducers/menu'

describe('menu reducer', function () {
  describe('menuCutoffUntil', function () {
    it('should handle initial state', function () {
      expect(menu.menuCutoffUntil(undefined, {})).to.equal('')
    })

    it('should handle unknown actions', function () {
      const state = '2016-06-26'
      expect(menu.menuCutoffUntil(state, { type: 'unknown' })).to.equal(state)
    })

    it('should handle MENU_CUTOFF_UNTIL_RECEIVE action types', function () {
      expect(menu.menuCutoffUntil('2016-06-26', { type: 'MENU_CUTOFF_UNTIL_RECEIVE', cutoffUntil: '2016-06-30' })).to.equal('2016-06-30')
    })
  })

  describe('menuRecipes', function () {
    it('should handle initial state', function () {
      const initialState = Immutable.List()
      expect(Immutable.is(menu.menuRecipes(undefined, {}), initialState)).to.equal(true)
    })

    it('should handle unknown actions', function () {
      const state = Immutable.List()
      const result = menu.menuRecipes(state, { type: 'unknown' })

      expect(Immutable.is(result, state)).to.equal(true)
    })

    it('should handle RECIPES_RECEIVE action types', function () {
      const initialState = Immutable.List()
      const result = menu.menuRecipes(initialState, { type: actionTypes.RECIPES_RECEIVE, recipes: [{ id: 1, title: 'recipe 1' }, { id: 2, title: 'recipe 2' }] })
      const expectedState = Immutable.List([1, 2])

      expect(Immutable.is(result, expectedState)).to.equal(true)
    })
  })

  describe('menuRecipeStock', function () {
    it('should handle initial state', function () {
      const initialState = Immutable.fromJS({})
      expect(Immutable.is(menu.menuRecipeStock(undefined, {}), initialState)).to.equal(true)
    })

    it('should handle unknown actions', function () {
      const state = Immutable.Map({ 1: 100, 2: 200 })
      const result = menu.menuRecipeStock(state, { type: 'unknown' })

      expect(Immutable.is(result, state)).to.equal(true)
    })

    it('should handle MENU_RECIPE_STOCK_CLEAR action type', function () {
      const state = Immutable.Map({ 1: 100, 2: 200 })
      const result = menu.menuRecipeStock(state, { type: 'MENU_RECIPE_STOCK_CLEAR' })

      expect(Immutable.is(result, Immutable.Map({}))).to.equal(true)
    })

    it('should handle MENU_RECIPE_STOCK_CHANGE action type, not capping the stock to 0', function () {
      const state = Immutable.fromJS({
        1: { 2: 12, 4: 14, 8: 0 },
        2: { 2: 22, 4: 24, 8: 0 },
        3: { 2: 32, 4: 34, 8: 0 }
      })
      const stock = { 1: { 4: -16 }, 2: { 2: 2 } }
      const result = menu.menuRecipeStock(state, { type: 'MENU_RECIPE_STOCK_CHANGE', stock })
      const expectedState = Immutable.fromJS({
        1: { 2: 12, 4: -2, 8: 0 },
        2: { 2: 24, 4: 24, 8: 0 },
        3: { 2: 32, 4: 34, 8: 0 }
      })
      expect(result.toJS()).to.eql(expectedState.toJS())
    })

    it('should handle MENU_RECIPE_STOCK_REPLACE action type', function () {
      const state = Immutable.fromJS({
        1: { 2: 12, 4: 14, 8: 12 },
        2: { 2: 22, 4: 24, 8: 22 },
        3: { 2: 32, 4: 34, 8: 32 }
      })
      const stock = { 1: { 4: 14 }, 2: { 2: 2 } }
      const result = menu.menuRecipeStock(state, { type: 'MENU_RECIPE_STOCK_REPLACE', stock })
      const expected = Immutable.fromJS({
        1: { 4: 14, 2: 0, 8: 0 },
        2: { 2: 2, 4: 0, 8: 0 }
      })
      expect(result.toJS()).to.eql(expected.toJS())
    })
  })

  describe('menuBoxPrices', function () {
    it('should handle initial state', function () {
      const initialState = Immutable.Map({})
      expect(Immutable.is(menu.menuBoxPrices(undefined, {}), initialState)).to.equal(true)
    })

    it('should handle unknown actions', function () {
      const state = Immutable.Map({ prices: [1, 2] })
      const result = menu.menuBoxPrices(state, { type: 'unknown' })

      expect(Immutable.is(result, state)).to.equal(true)
    })

    it('should handle MENU_BOX_PRICES_RECEIVE action types', function () {
      const initialState = Immutable.Map({ prices: [1, 2] })
      const result = menu.menuBoxPrices(initialState, { type: actionTypes.MENU_BOX_PRICES_RECEIVE, prices: [1, 2, 3] })
      const expectedState = Immutable.fromJS([1, 2, 3])

      expect(Immutable.is(result, expectedState)).to.equal(true)
    })
  })

  describe('menuBoxPricesTariff', function () {
    it('should handle initial state', function () {
      const initialState = null
      expect(menu.menuBoxPricesTariff(undefined, {})).to.equal(initialState)
    })

    it('should handle unknown actions', function () {
      const prevState = 'test-tariff'
      const result = menu.menuBoxPricesTariff(prevState, { type: 'unknown' })

      expect(result).to.equal(prevState)
    })

    it('should handle MENU_BOX_PRICES_RECEIVE action types', function () {
      const initialState = 'old-tariff'
      const result = menu.menuBoxPricesTariff(initialState, {
        type: actionTypes.MENU_BOX_PRICES_RECEIVE,
        prices: [1, 2, 3],
        tariffId: 'new-tariff',
      })

      expect(result).to.equal('new-tariff')
    })

    it('should handle resetting state if tariffId is undefined', function () {
      const initialState = 'old-tariff'
      const result = menu.menuBoxPricesTariff(initialState, {
        type: actionTypes.MENU_BOX_PRICES_RECEIVE,
        prices: [1, 2, 3],
        tariffId: undefined,
      })

      expect(result).to.equal(null)
    })
  })

  describe('menuBrowseCTAShow', function () {
    it('should handle initial state', function () {
      expect(menu.menuBrowseCTAShow(undefined, {})).to.equal(false)
    })

    it('should handle unknown actions', function () {
      const state = true
      expect(menu.menuBrowseCTAShow(state, { type: 'unknown' })).to.equal(true)
    })

    it('should handle MENU_RECIPE_DETAIL_VISIBILITY_CHANGE action types', function () {
      const initialState = false
      const result = menu.menuBrowseCTAShow(initialState, { type: actionTypes.MENU_BROWSE_CTA_VISIBILITY_CHANGE, show: true })
      const expectedState = true

      expect(result).to.equal(expectedState)
    })
  })

  describe('menuCollections', function () {
    it('should handle initial state', function () {
      const initialState = undefined
      const action = {}
      const actual = menu.menuCollections(initialState, action)
      const expected = Immutable.OrderedMap()
      expect(Immutable.is(actual, expected)).to.equal(true)
    })

    it('should handle unknown actions', function () {
      const initialState = Immutable.OrderedMap()
      const action = { type: 'unknown' }
      const actual = menu.menuCollections(initialState, action)
      const expected = Immutable.OrderedMap()
      expect(Immutable.is(actual, expected)).to.equal(true)
    })

    it('should handle MENU_COLLECTIONS_RECEIVE action types', function () {
      const collections = [
        {
          id: '123-123-123',
          shortTitle: 'Burgers!',
          colour: 'brown',
        },
        {
          id: '345-345-345',
          shortTitle: 'Savour the Summer',
          colour: 'orange',
        },
        {
          id: '678-678-678',
          shortTitle: 'Quick Meals',
          colour: 'yellow',
        },
        {
          id: '789-789-789',
          shortTitle: 'All Recipes',
          colour: 'bluie',
          default: true,
        },
      ]

      const initialState = Immutable.OrderedMap()
      const action = { type: actionTypes.MENU_COLLECTIONS_RECEIVE, collections }
      const actual = menu.menuCollections(initialState, action)
      const expected = Immutable.OrderedMap({
        '123-123-123': Immutable.Map({
          id: '123-123-123',
          shortTitle: 'Burgers!',
          colour: 'brown',
        }),
        '345-345-345': Immutable.Map({
          id: '345-345-345',
          shortTitle: 'Savour the Summer',
          colour: 'orange',
        }),
        '678-678-678': Immutable.Map({
          id: '678-678-678',
          shortTitle: 'Quick Meals',
          colour: 'yellow',
        }),
        '789-789-789': Immutable.Map({
          id: '789-789-789',
          shortTitle: 'All Recipes',
          colour: 'bluie',
          default: true,
        }),
      })
      expect(Immutable.is(actual, expected)).to.equal(true)
    })

    it('should retain the given order', function () {
      const collections = [
        {
          id: '678-678-678',
          shortTitle: 'Quick Meals',
          colour: 'yellow',
        },
        {
          id: '123-123-123',
          shortTitle: 'Burgers!',
          colour: 'brown',
        },
        {
          id: '345-345-345',
          shortTitle: 'Savour the Summer',
          colour: 'orange',
        },
        {
          id: '789-789-789',
          shortTitle: 'All Recipes',
          colour: 'bluie',
          default: true,
        },
      ]

      const initialState = Immutable.OrderedMap()
      const action = { type: actionTypes.MENU_COLLECTIONS_RECEIVE, collections }
      const actual = menu.menuCollections(initialState, action)

      let expected = Immutable.OrderedMap({})
      expected = expected.set('678-678-678', Immutable.fromJS({
        id: '678-678-678',
        shortTitle: 'Quick Meals',
        colour: 'yellow',
      }))
      expected = expected.set('123-123-123', Immutable.fromJS({
        id: '123-123-123',
        shortTitle: 'Burgers!',
        colour: 'brown',
      }))
      expected = expected.set('345-345-345', Immutable.fromJS({
        id: '345-345-345',
        shortTitle: 'Savour the Summer',
        colour: 'orange',
      }))
      expected = expected.set('789-789-789', Immutable.fromJS({
        id: '789-789-789',
        shortTitle: 'All Recipes',
        colour: 'bluie',
        default: true,
      }))

      expect(Immutable.is(actual, expected)).to.equal(true)
    })
  })

  describe('menuRecipesUpdatedAt', function () {
    let menuMocked
    beforeEach(function () {
      menuMocked = require('inject-loader?moment!reducers/menu')({
        moment: {
          now: () => 987654321,
        },
      }).default
    })

    it('should handle initial state', function () {
      expect(menuMocked.menuRecipesUpdatedAt(undefined, {})).to.equal(null)
    })

    it('should handle unknown actions', function () {
      const state = 123456
      expect(menuMocked.menuRecipesUpdatedAt(state, { type: 'unknown' })).to.equal(123456)
    })

    it('should handle MENU_COLLECTION_RECIPES_RECEIVE action types', function () {
      const initialState = null
      const result = menuMocked.menuRecipesUpdatedAt(initialState, { type: actionTypes.MENU_COLLECTION_RECIPES_RECEIVE })

      expect(result).to.equal(987654321)
    })

    it('should handle RECIPES_RECEIVE action types', function () {
      const initialState = null
      const result = menuMocked.menuRecipesUpdatedAt(initialState, { type: actionTypes.RECIPES_RECEIVE })

      expect(result).to.equal(987654321)
    })
  })
})
