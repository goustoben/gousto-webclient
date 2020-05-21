import Immutable from 'immutable'
import * as recipeUtils from 'utils/recipe'
import { safeJestMock } from '../../../../_testing/mocks'
import {
  getRecipeTitle,
  getRecipeOutOfStock,
  getTagDefinition
} from '../recipe'

jest.mock('config/menu', () => ({
  stockThreshold: 3
})
)

describe('menu recipe selectors', () => {
  describe('getRecipeTitle', () => {
    beforeEach(() => {
      const formatRecipeTitle = safeJestMock(recipeUtils, 'formatRecipeTitle')
      formatRecipeTitle.mockImplementation((title, box, diet) => `${title} - ${box} - ${diet}`)
    })

    const allRecipes = Immutable.fromJS({
      123: {
        title: 'foo',
        boxType: 'bar',
        dietType: 'quz'
      }
    })

    describe('when recipe id is null', () => {
      const recipeId = null

      test('should return null', () => {
        const result = getRecipeTitle.resultFunc(allRecipes, recipeId)

        expect(result).toEqual(null)
      })
    })

    describe('when recipe id is not a recipe', () => {
      const recipeId = '567'

      test('should return null', () => {
        const result = getRecipeTitle.resultFunc(allRecipes, recipeId)

        expect(result).toEqual(null)
      })
    })

    describe('when recipe id is valid', () => {
      const recipeId = '123'

      test('should return title', () => {
        const result = getRecipeTitle.resultFunc(allRecipes, recipeId)

        expect(result).toEqual('foo - bar - quz')
      })
    })
  })

  describe('getRecipeOutOfStock', () => {
    const recipeId = '111'
    const numPortions = 2
    let props

    beforeEach(() => {
      props = {
        recipeId
      }
    })

    describe('when stock is lower than threshold', () => {
      test('should return true', () => {
        const menuRecipeStock = Immutable.fromJS({
          [recipeId]: { [numPortions]: -1000, 4: -1000 },
          222: { 2: 1000, 4: 1000 },
        })
        const state = {
          menuRecipeStock,
          basket: Immutable.fromJS({
            numPortions,
            recipes: {}
          }),
        }
        const result = getRecipeOutOfStock(state, props)
        expect(result).toEqual(true)
      })
    })

    describe('when stock is higher than threshold', () => {
      test('should return false', () => {
        const menuRecipeStock = Immutable.fromJS({
          [recipeId]: { [numPortions]: 1000, 4: 1000 },
          222: { 2: 1000, 4: 1000 },
        })
        const state = {
          menuRecipeStock,
          basket: Immutable.fromJS({
            numPortions,
            recipes: {}
          }),
        }
        const result = getRecipeOutOfStock(state, props)
        expect(result).toEqual(false)
      })
    })

    describe('when recipe is in basket', () => {
      test('should return false', () => {
        const menuRecipeStock = Immutable.fromJS({
          [recipeId]: { [numPortions]: -1000, 4: -1000 },
          222: { 2: 1000, 4: 1000 },
        })
        const state = {
          menuRecipeStock,
          basket: Immutable.fromJS({
            numPortions,
            recipes: { [recipeId]: 1 }
          }),
        }
        const result = getRecipeOutOfStock(state, props)
        expect(result).toEqual(false)
      })
    })

    describe('when stock is null', () => {
      test('should return false', () => {
        const menuRecipeStock = Immutable.fromJS({
          [recipeId]: { [numPortions]: null, 4: null },
          222: { 2: 1000, 4: 1000 },
        })
        const state = {
          menuRecipeStock,
          basket: Immutable.fromJS({
            numPortions,
            recipes: {}
          }),
        }
        const result = getRecipeOutOfStock(state, props)
        expect(result).toEqual(false)
      })
    })
  })

  describe('getTagDefinition', () => {
    describe('when matching tag for slug exists', () => {
      test('should return the tag theme info', () => {
        const props = {
          slug: 'new',
        }

        const state = {
          brand: {
            data: {
              tags: [{
                type: 'general',
                slug: 'new',
                text: 'New',
                themes: [{
                  name: 'light',
                  color: '#01A92B',
                  borderColor: '#01A92B'
                }]
              }]
            }
          }
        }
        const result = getTagDefinition(state, props)
        expect(result).toEqual({
          type: 'general',
          slug: 'new',
          text: 'New',
          theme: {
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }
        })
      })
    })

    describe('when no matching tag for slug exists', () => {
      test('should return null', () => {
        const props = {
          slug: 'new',
        }

        const state = {
          brand: {
            data: {
              tags: []
            }
          }
        }
        const result = getTagDefinition(state, props)
        expect(result).toEqual(null)
      })
    })
  })
})
