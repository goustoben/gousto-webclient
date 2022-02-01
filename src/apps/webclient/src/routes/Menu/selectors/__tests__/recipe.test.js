import Immutable from 'immutable'
import * as recipeUtils from 'utils/recipe'
import { safeJestMock } from '../../../../_testing/mocks'
import {
  getRecipeTitle,
  getRecipeSurcharge,
  getRecipeDisclaimerProps,
  getVariantsForRecipeForCurrentCollection,
  getRecipeIsFineDineIn,
  getRecipeIngredientsProps,
  getRecipeAllergensProps,
  getRecipePerPortionProps,
  getRecipePer100gProps, getRecipeSidesSurcharge,
} from '../recipe'

jest.mock('config/menu', () => ({
  stockThreshold: 3
}))

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

  describe('getRecipeSidesSurcharge', () => {
    const recipeId = '111'
    let state

    beforeEach(() => {
      state = {
        recipes: Immutable.fromJS({
          [recipeId]: {
            meals: [
              {
                numPortions: 2,
                surcharge: { listPrice: 1.50 }
              },
              {
                numPortions: 4,
                surcharge: { listPrice: 3.00 }
              }
            ]
          }
        })
      }
    })

    describe('when basket numPortions is 2', () => {
      beforeEach(() => {
        state = {
          ...state,
          basket: Immutable.fromJS({
            numPortions: 2
          })
        }
      })

      test('should return 2 portion surcharge', () => {
        const result = getRecipeSidesSurcharge(state, { recipeId })
        expect(result).toEqual(1.50)
      })
    })

    describe('when basket numPortions is 4', () => {
      beforeEach(() => {
        state = {
          ...state,
          basket: Immutable.fromJS({
            numPortions: 4
          })
        }
      })

      test('should return 4 portion surcharge', () => {
        const result = getRecipeSidesSurcharge(state, { recipeId })
        expect(result).toEqual(3.00)
      })
    })
  })

  describe('getRecipeSurcharge', () => {
    const recipeId = '111'
    const recipes = Immutable.fromJS({
      [recipeId]: {
        meals: [
          {
            numPortions: 2,
            surcharge: {
              listPrice: 1.49
            }
          }
        ]
      },
    })
    let props

    beforeEach(() => {
      props = {
        recipeId
      }
    })

    describe('When recipe has a surcharge', () => {
      test('should return the amount of the surcharge', () => {
        const state = {
          basket: Immutable.fromJS({
            numPortions: 2
          }),
          recipes
        }
        const result = getRecipeSurcharge(state, props)
        expect(result).toEqual(0.75)
      })
    })
  })

  describe('recipe detail props selectors', () => {
    let state
    beforeEach(() => {
      state = {
        recipes: Immutable.fromJS({
          1: {
            health: {
              claims: [
                {
                  disclaimer: 'Iron, magnesium and B vitamins reducing tiredness and fatigue',
                  slug: 'health-kitchen',
                }
              ]
            },
            ingredients: [
              { name: 'Apple', label: 'apple' }
            ],
            allergens: ['milk', 'wheat'],
            nutritionalInformation: {
              perPortion: {
                energyKj: 100
              },
              per100g: {
                energyKj: 50
              }
            }
          },
          2: {
            health: {}
          },
          4: {
            health: {
              claims: [{
                slug: 'unknown',
                disclaimer: 'Iron, magnesium and B vitamins reducing tiredness and fatigue'
              }]
            }
          },
        }),
      }
    })

    describe('getRecipeIngredientsProps', () => {
      describe('when recipeId is not part of recipes', () => {
        const props = {
          recipeId: '3'
        }

        test('should return null', () => {
          const result = getRecipeIngredientsProps(state, props)
          expect(result).toBe(null)
        })
      })

      describe('when recipe has no ingredients', () => {
        const props = {
          recipeId: '2'
        }

        test('should return empty list', () => {
          const result = getRecipeIngredientsProps(state, props)
          expect(result).toBe(Immutable.List())
        })
      })

      describe('when recipe has ingredients', () => {
        const props = {
          recipeId: '1'
        }

        test('should return ingredients', () => {
          const result = getRecipeIngredientsProps(state, props)
          expect(result).toBe(state.recipes.getIn(['1', 'ingredients']))
        })
      })
    })

    describe('getRecipeAllergensProps', () => {
      describe('when recipeId is not part of recipes', () => {
        const props = {
          recipeId: '3'
        }

        test('should return null', () => {
          const result = getRecipeAllergensProps(state, props)
          expect(result).toBe(null)
        })
      })

      describe('when recipe has no allergens', () => {
        const props = {
          recipeId: '2'
        }

        test('should return empty list', () => {
          const result = getRecipeAllergensProps(state, props)
          expect(result).toBe(Immutable.List())
        })
      })

      describe('when recipe has allergens', () => {
        const props = {
          recipeId: '1'
        }

        test('should return allergens', () => {
          const result = getRecipeAllergensProps(state, props)
          expect(result).toBe(state.recipes.getIn(['1', 'allergens']))
        })
      })
    })

    describe('getRecipePerPortionProps', () => {
      describe('when recipeId is not part of recipes', () => {
        const props = {
          recipeId: '3'
        }

        test('should return null', () => {
          const result = getRecipePerPortionProps(state, props)
          expect(result).toBe(null)
        })
      })

      describe('when recipe has no nutritional info', () => {
        const props = {
          recipeId: '2'
        }

        test('should return empty map', () => {
          const result = getRecipePerPortionProps(state, props)
          expect(result).toBe(Immutable.Map())
        })
      })

      describe('when recipe has nutritional info', () => {
        const props = {
          recipeId: '1'
        }

        test('should return per portion', () => {
          const result = getRecipePerPortionProps(state, props)
          expect(result).toBe(state.recipes.getIn(['1', 'nutritionalInformation', 'perPortion']))
        })
      })
    })

    describe('getRecipePer100gProps', () => {
      describe('when recipeId is not part of recipes', () => {
        const props = {
          recipeId: '3'
        }

        test('should return null', () => {
          const result = getRecipePer100gProps(state, props)
          expect(result).toBe(null)
        })
      })

      describe('when recipe has no nutritional info', () => {
        const props = {
          recipeId: '2'
        }

        test('should return empty map', () => {
          const result = getRecipePer100gProps(state, props)
          expect(result).toBe(Immutable.Map())
        })
      })

      describe('when recipe has nutritional info', () => {
        const props = {
          recipeId: '1'
        }

        test('should return per 100g', () => {
          const result = getRecipePer100gProps(state, props)
          expect(result).toBe(state.recipes.getIn(['1', 'nutritionalInformation', 'per100g']))
        })
      })
    })

    describe('getRecipeDisclaimerProps', () => {
      describe('when recipeId is not part of recipes', () => {
        const props = {
          recipeId: '3'
        }

        test('should return null', () => {
          const result = getRecipeDisclaimerProps(state, props)
          expect(result).toBe(null)
        })
      })

      describe('when recipe has no health claims', () => {
        const props = {
          recipeId: '2'
        }

        test('should return null', () => {
          const result = getRecipeDisclaimerProps(state, props)
          expect(result).toBe(null)
        })
      })

      describe('when recipe health slug is not part of brand data', () => {
        const props = {
          recipeId: '4'
        }

        test('should return only disclaimer', () => {
          const result = getRecipeDisclaimerProps(state, props)
          const expectedResult = {
            disclaimer: 'Iron, magnesium and B vitamins reducing tiredness and fatigue',
          }
          expect(result).toEqual(expectedResult)
        })
      })

      describe('when recipe has health claims', () => {
        const props = {
          recipeId: '1',
          brandTags: [
            {
              slug: 'health-kitchen',
              icon: 'health-kitchen-heart',
              themes: [{
                name: 'light',
                backgroundColor: 'green',
                iconColor: 'lightGreen'
              }]
            }
          ],
        }

        test('should return disclaimer', () => {
          const result = getRecipeDisclaimerProps(state, props)
          const expectedResult = {
            disclaimer: 'Iron, magnesium and B vitamins reducing tiredness and fatigue',
            icon: 'health-kitchen-heart',
            slug: 'health-kitchen',
            theme: {
              backgroundColor: 'green',
              iconColor: 'lightGreen',
              name: 'light'
            }
          }
          expect(result).toEqual(expectedResult)
        })
      })
    })
  })

  describe('getVariantsForRecipeForCurrentCollection', () => {
    const recipeId = '1'
    let variants
    let menuRecipes = Immutable.List()
    let collectionDietaryClaims = null
    describe('when no variants', () => {
      beforeEach(() => {
        variants = null
      })
      test('should return null', () => {
        const result = getVariantsForRecipeForCurrentCollection(variants, recipeId, menuRecipes, collectionDietaryClaims)
        expect(result).toEqual(null)
      })
    })
    describe('when variants not include recipe id', () => {
      beforeEach(() => {
        variants = Immutable.fromJS({
          2: {},
          3: {}
        })
      })
      test('should return null', () => {
        const result = getVariantsForRecipeForCurrentCollection(variants, recipeId, menuRecipes, collectionDietaryClaims)
        expect(result).toEqual(null)
      })
    })

    describe('when variants for recipe have no alternatives', () => {
      beforeEach(() => {
        variants = Immutable.fromJS({
          1: {
            alternatives: []
          },
          2: {}
        })
      })
      test('should return null', () => {
        const result = getVariantsForRecipeForCurrentCollection(variants, recipeId, menuRecipes, collectionDietaryClaims)
        expect(result).toEqual(null)
      })
    })

    describe('when collectionDietaryClaims is null', () => {
      beforeEach(() => {
        collectionDietaryClaims = null
        variants = Immutable.fromJS({
          1: {
            alternatives: [{
              id: '1sds1231sds',
              coreRecipeId: '2'
            }]
          },
          2: {}
        })
      })
      test('should return recipe variants', () => {
        const result = getVariantsForRecipeForCurrentCollection(variants, recipeId, menuRecipes, collectionDietaryClaims)
        expect(result).toEqual({
          type: 'alternatives',
          alternatives: Immutable.fromJS([{
            id: '1sds1231sds',
            coreRecipeId: '2'
          }]),
          variantsList: Immutable.fromJS([{
            id: '1sds1231sds',
            coreRecipeId: '2'
          }])
        })
      })
    })

    describe('when collectionDietaryClaims is not null', () => {
      beforeEach(() => {
        collectionDietaryClaims = Immutable.List(['gluten-free'])
        variants = Immutable.fromJS({
          1: {
            alternatives: [{
              id: '1sds1231sds',
              coreRecipeId: '2'
            }]
          },
          2: {
            alternatives: [{
              id: '1sds1231sds',
              coreRecipeId: '1'
            }]
          }
        })
        menuRecipes = Immutable.fromJS([
          {
            id: '1',
            dietaryClaims: [
              {
                name: 'Gluten free',
                slug: 'gluten-free',
              }
            ],
          },
          {
            id: '2',
            dietaryClaims: [
              {
                name: 'Gluten free',
                slug: 'gluten-free',
              }
            ],
          }
        ])
      })
      test('should return recipe variants that have same claims', () => {
        const result = getVariantsForRecipeForCurrentCollection(variants, recipeId, menuRecipes, collectionDietaryClaims)
        expect(result).toEqual({
          type: 'alternatives',
          alternatives: Immutable.fromJS([{
            id: '1sds1231sds',
            coreRecipeId: '2'
          }]),
          variantsList: Immutable.fromJS([{
            id: '1sds1231sds',
            coreRecipeId: '2'
          }])
        })
      })

      describe('when variant has different claim', () => {
        beforeEach(() => {
          menuRecipes = Immutable.fromJS([
            {
              id: '1',
              dietaryClaims: [
                {
                  name: 'Gluten free',
                  slug: 'gluten-free',
                }
              ],
            },
            {
              id: '2',
              dietaryClaims: [
                {
                  name: 'Vegetarian',
                  slug: 'vegetarian',
                }
              ],
            }
          ])
        })
        test('should return recipe variants that have same claims', () => {
          const result = getVariantsForRecipeForCurrentCollection(variants, recipeId, menuRecipes, collectionDietaryClaims)
          expect(result).toEqual({
            type: 'alternatives',
            alternatives: Immutable.List(),
            variantsList: Immutable.List()
          })
        })
      })

      describe('when variant has no claims', () => {
        beforeEach(() => {
          menuRecipes = Immutable.fromJS([
            {
              id: '1',
              dietaryClaims: [],
            },
            {
              id: '2',
              dietaryClaims: [],
            }
          ])
        })
        test('should return recipe variants that have same claims', () => {
          const result = getVariantsForRecipeForCurrentCollection(variants, recipeId, menuRecipes, collectionDietaryClaims)
          expect(result).toEqual({
            type: 'alternatives',
            alternatives: Immutable.List(),
            variantsList: Immutable.List([])
          })
        })
      })
    })

    describe('when variant is sides', () => {
      beforeEach(() => {
        collectionDietaryClaims = Immutable.List(['gluten-free'])
        variants = Immutable.fromJS({
          1: {
            sides: [{
              id: '1sds1231sds',
              coreRecipeId: '2'
            }]
          },
          2: {
            sides: [{
              id: '1sds1231sds',
              coreRecipeId: '1'
            }]
          }
        })
        menuRecipes = Immutable.fromJS([
          {
            id: '1',
            dietaryClaims: [
              {
                name: 'Gluten free',
                slug: 'gluten-free',
              }
            ],
          },
          {
            id: '2',
            dietaryClaims: [
              {
                name: 'Gluten free',
                slug: 'gluten-free',
              }
            ],
          }
        ])
      })

      test('should return recipe variants as sides', () => {
        const result = getVariantsForRecipeForCurrentCollection(variants, recipeId, menuRecipes, collectionDietaryClaims)
        expect(result).toEqual({
          type: 'sides',
          variantsList: Immutable.fromJS([{
            id: '1sds1231sds',
            coreRecipeId: '2'
          }]),
          sides: Immutable.fromJS([{
            id: '1sds1231sds',
            coreRecipeId: '2'
          }])
        })
      })
    })
  })

  describe('getRecipeIsFineDineIn', () => {
    const allRecipes = Immutable.fromJS({
      123: {
        title: 'foo',
        boxType: 'bar',
        dietType: 'quz',
        isFineDineIn: true,
      }
    })

    describe('when recipe id is null', () => {
      const recipeId = null

      test('should return false', () => {
        const result = getRecipeIsFineDineIn.resultFunc(allRecipes, recipeId)

        expect(result).toEqual(false)
      })
    })

    describe('when recipe id is not a recipe', () => {
      const recipeId = '567'

      test('should return null', () => {
        const result = getRecipeIsFineDineIn.resultFunc(allRecipes, recipeId)

        expect(result).toEqual(false)
      })
    })

    describe('when recipe id is valid', () => {
      const recipeId = '123'

      test('should return true', () => {
        const result = getRecipeIsFineDineIn.resultFunc(allRecipes, recipeId)

        expect(result).toEqual(true)
      })
    })
  })
})
