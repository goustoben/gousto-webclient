import Immutable from 'immutable'
import { okRecipes } from 'utils/basket'
import { getOkRecipeIds, getUnavailableRecipeIds, getOkShortlistRecipeIds } from '../basket'

describe('the composed selectors', () => {
  describe('getOkRecipeIds', () => {
    let basketRecipes
    let menuRecipeIds
    let stock
    let numPortions

    beforeEach(() => {
      basketRecipes = Immutable.Map({ '100': 1 })
      menuRecipeIds = Immutable.fromJS(['100', '200'])
      stock = Immutable.fromJS({
        '100': {
          '2': 1000,
          '4': 1000,
          '8': 0,
        },
        '200': {
          '2': 1000,
          '4': 1000,
          '8': 0,
        }
      })
      numPortions = 2
    })

    test('calls the okRecipes function with correct arguments', () => {
      expect(getOkRecipeIds.resultFunc(basketRecipes, menuRecipeIds, stock, numPortions))
        .toEqual(okRecipes(basketRecipes, menuRecipeIds, stock, numPortions))
    })
  })

  describe('getOkShortlistRecipeIds', () => {
    let shortlistRecipes
    let menuRecipeIds
    let stock
    let numPortions

    beforeEach(() => {
      shortlistRecipes = Immutable.Map({ '100': 1 })
      menuRecipeIds = Immutable.fromJS(['100', '200'])
      stock = Immutable.fromJS({
        '100': {
          '2': 1000,
          '4': 1000,
          '8': 0,
        },
        '200': {
          '2': 1000,
          '4': 1000,
          '8': 0,
        }
      })
      numPortions = 2
    })

    test('calls the okRecipes function with correct arguments', () => {
      expect(getOkShortlistRecipeIds.resultFunc(shortlistRecipes, menuRecipeIds, stock, numPortions))
        .toEqual(okRecipes(shortlistRecipes, menuRecipeIds, stock, numPortions))
    })
  })

  describe('getUnavailableRecipeIds', () => {
    let basketRecipes
    let okRecipeIds

    describe('when no recipes have been selected', () => {
      beforeEach(() => {
        basketRecipes = Immutable.Map()
        okRecipeIds = Immutable.Map()
      })

      test('returns an empty list', () => {
        expect(getUnavailableRecipeIds.resultFunc(basketRecipes, okRecipeIds)).toBe(Immutable.Map())
      })
    })

    describe('when recipes have been selected', () => {
      beforeEach(() => {
        basketRecipes = Immutable.Map({
          '100': 1,
          '200': 1,
          '300': 2,
        })
      })

      describe('and all recipes are available', () => {
        beforeEach(() => {
          okRecipeIds = Immutable.Map(basketRecipes)
        })

        test('returns an empty list', () => {
          expect(getUnavailableRecipeIds.resultFunc(basketRecipes, okRecipeIds)).toBe(Immutable.Map())
        })
      })

      describe('and some recipes are not available', () => {
        beforeEach(() => {
          okRecipeIds = Immutable.Map({
            '200': 1,
          })
        })

        test('returns the unavailable recipes', () => {
          const expectedUnavailable = Immutable.Map({
            '100': 1,
            '300': 2,
          })

          expect(getUnavailableRecipeIds.resultFunc(basketRecipes, okRecipeIds)).toEqual(expectedUnavailable)
        })
      })

      describe('and all recipes are unavailable', () => {
        beforeEach(() => {
          okRecipeIds = Immutable.Map()
        })

        test('returns all recipes as unavailable', () => {
          expect(getUnavailableRecipeIds.resultFunc(basketRecipes, okRecipeIds)).toEqual(basketRecipes)
        })
      })
    })
  })
})
