import Immutable from 'immutable'
import { okRecipes } from 'utils/basket'
import { getOkRecipeIds, getUnavailableRecipeIds, getFormatedRulesMessage, getMenuRecipeDetailShowIsOutOfStock } from '../basket'

describe('the composed selectors', () => {
  describe('getOkRecipeIds', () => {
    let basketRecipes
    let menuRecipeIds
    let stock
    let numPortions

    beforeEach(() => {
      basketRecipes = Immutable.Map({ 100: 1 })
      menuRecipeIds = Immutable.fromJS(['100', '200'])
      stock = Immutable.fromJS({
        100: {
          2: 1000,
          4: 1000,
          8: 0,
        },
        200: {
          2: 1000,
          4: 1000,
          8: 0,
        }
      })
      numPortions = 2
    })

    test('calls the okRecipes function with correct arguments', () => {
      expect(getOkRecipeIds.resultFunc(basketRecipes, menuRecipeIds, stock, numPortions))
        .toEqual(okRecipes(basketRecipes, menuRecipeIds, stock, numPortions))
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
          100: 1,
          200: 1,
          300: 2,
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
            200: 1,
          })
        })

        test('returns the unavailable recipes', () => {
          const expectedUnavailable = Immutable.Map({
            100: 1,
            300: 2,
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

  describe('getFormatedRulesMessage', () => {
    let state
    let rules
    beforeEach(() => {
      state = {
        recipes: Immutable.fromJS({
          123: {
            id: 123,
            title: 'Chicken',
            media: {
              images: [{
                urls: [{
                  src: 'url-for-image'
                }]
              }]
            }
          }
        })
      }
      rules = [
        {
          items: ['123'],
          message: 'Only 1 oven ready meal is available per order',
          name: 'charlie-binghams-basket-limit'
        },
        {
          items: ['123'],
          message: 'Only 1 new-rule meal is available per order',
          name: 'new-rule'
        }
      ]
    })

    test('should return formated data', () => {
      const result = getFormatedRulesMessage(state, rules)
      const expectedResult = [{
        description: 'Only 1 oven ready meal is available per order',
        recipes: [{
          imageUrl: 'url-for-image',
          title: 'Chicken'}]
      },
      {
        description: 'Only 1 new-rule meal is available per order',
        recipes: [{
          imageUrl: 'url-for-image',
          title: 'Chicken'
        }]
      }]
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getMenuRecipeDetailShowIsOutOfStock', () => {
    let state
    describe('when recipe in detail screen is out of stock', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            numPortions: 2,
            recipes: {}
          }),
          menuRecipeDetails: Immutable.fromJS({
            recipeId: '1'
          }),
          menuRecipeStock: Immutable.fromJS({
            1: {
              2: -100
            }
          })
        }
      })
      test('should return true', () => {
        const result = getMenuRecipeDetailShowIsOutOfStock(state)
        expect(result).toBe(true)
      })
    })

    describe('when recipe in detail screen is in stock', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            numPortions: 2,
            recipes: {}
          }),
          menuRecipeDetails: Immutable.fromJS({
            recipeId: '1'
          }),
          menuRecipeStock: Immutable.fromJS({
            1: {
              2: 1000
            }
          })
        }
      })
      test('should return false', () => {
        const result = getMenuRecipeDetailShowIsOutOfStock(state)
        expect(result).toBe(false)
      })
    })

    describe('when recipe in detail screen is out of stock and inBasket', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            numPortions: 2,
            recipes: {
              1: 1
            }
          }),
          menuRecipeDetails: Immutable.fromJS({
            recipeId: '1'
          }),
          menuRecipeStock: Immutable.fromJS({
            1: {
              2: -1000
            }
          })
        }
      })
      test('should return false', () => {
        const result = getMenuRecipeDetailShowIsOutOfStock(state)
        expect(result).toBe(false)
      })
    })
  })
})
