import Immutable from 'immutable'

import { isRecipeInBasket } from 'utils/menu'

import * as recipeListSelectors from '../recipeList'

jest.mock('utils/menu')

describe('RecipeList selectors', () => {
  const dietaryClaims = [
    {
      name: 'Gluten free',
      slug: 'gluten-free',
    },
  ]
  const firstRecipe = Immutable.fromJS({ id: '327', sortOrder: 1, dietaryClaims })
  const variantRecipe = Immutable.fromJS({ id: '820', sortOrder: 4, dietaryClaims })

  let currentMenuVariants

  beforeEach(() => {
    currentMenuVariants = Immutable.fromJS({
      [firstRecipe.get('id')]: {
        alternatives: [
          {
            coreRecipeId: variantRecipe.get('id'),
          },
        ],
      },
    })
  })

  describe('getInStockRecipes', () => {
    const recipes = [
      Immutable.fromJS({
        id: 'recipe1',
        desc: 'recipe1Desc',
      }),
    ]
    const stock = Immutable.fromJS({
      recipe1: {
        2: 100,
        4: 100,
      },
    })
    const basketRecipes = []
    const numPortions = 2
    test('should return recipes when isRecipeInBasket is true', () => {
      isRecipeInBasket.mockImplementationOnce(() => true)
      const result = recipeListSelectors.getInStockRecipes.resultFunc(
        recipes,
        stock,
        basketRecipes,
        numPortions,
      )
      expect(result).toEqual([
        Immutable.fromJS({
          id: 'recipe1',
          desc: 'recipe1Desc',
        }),
      ])
    })

    test('should return recipes when isOutOfStock is true', () => {
      const result = recipeListSelectors.getInStockRecipes.resultFunc(
        recipes,
        stock,
        basketRecipes,
        numPortions,
      )
      expect(result).toEqual([Immutable.fromJS({ id: 'recipe1', desc: 'recipe1Desc' })])
    })
  })

  describe('getBaseRecipeSides', () => {
    describe('When there is no currentMenuVariant', () => {
      beforeEach(() => {
        currentMenuVariants = undefined
      })

      test('then it should return null', () => {
        const expected = null
        expect(recipeListSelectors.getBaseRecipeSides.resultFunc(currentMenuVariants)).toEqual(
          expected,
        )
      })
    })

    describe('When there are side recipes in currentMenuVariant', () => {
      beforeEach(() => {
        currentMenuVariants = Immutable.Map({
          123: {
            sides: [
              {
                coreRecipeId: 987,
              },
            ],
          },
          456: {
            sides: [
              {
                coreRecipeId: 765,
              },
            ],
          },
        })
      })

      test('then it should return a mapping of the recipe sides and their base recipe', () => {
        const expected = Immutable.Map({
          987: '123',
          765: '456',
        })

        expect(recipeListSelectors.getBaseRecipeSides.resultFunc(currentMenuVariants)).toEqual(
          expected,
        )
      })
    })

    describe('When there are no side recipes in currentMenuVariant', () => {
      beforeEach(() => {
        currentMenuVariants = Immutable.Map({
          123: {},
          456: {},
          789: {
            sides: [
              {
                coreRecipeId: 999,
              },
            ],
          },
        })
      })

      test('then it should not add to the side recipe mapping', () => {
        const expected = Immutable.Map({
          999: '789',
        })

        expect(recipeListSelectors.getBaseRecipeSides.resultFunc(currentMenuVariants)).toEqual(
          expected,
        )
      })
    })
  })

  describe('getBasketRecipeWithSidesBaseId', () => {
    let basketRecipes
    let recipeSides

    describe('When there is no recipe sides', () => {
      beforeEach(() => {
        basketRecipes = Immutable.Map({
          987: 1,
          456: 1,
        })

        recipeSides = null
      })

      test('then it should return basketRecipes', () => {
        const expected = Immutable.Map({
          987: 1,
          456: 1,
        })
        expect(
          recipeListSelectors.getBasketRecipeWithSidesBaseId.resultFunc(basketRecipes, recipeSides),
        ).toEqual(expected)
      })
    })

    describe('When recipes with sides have been selected from the menu', () => {
      beforeEach(() => {
        basketRecipes = Immutable.Map({
          987: 1,
          456: 1,
        })
        recipeSides = Immutable.Map({
          987: '123',
        })
      })

      test('then it should return the base recipe id instead of the side recipe id', () => {
        const expected = Immutable.Map({
          123: 1,
          456: 1,
        })
        expect(
          recipeListSelectors.getBasketRecipeWithSidesBaseId.resultFunc(basketRecipes, recipeSides),
        ).toEqual(expected)
      })
    })
  })

  describe('replaceSideRecipeIdWithBaseRecipeId', () => {
    let recipeId
    let recipeSides

    describe('When there is no recipe sides', () => {
      beforeEach(() => {
        recipeId = '123'
        recipeSides = null
      })

      test('then it should return recipeId', () => {
        const expected = '123'
        expect(
          recipeListSelectors.replaceSideRecipeIdWithBaseRecipeId.resultFunc(recipeId, recipeSides),
        ).toEqual(expected)
      })
    })

    describe('When recipesId is a side recipe', () => {
      beforeEach(() => {
        recipeId = '123'
        recipeSides = Immutable.Map({
          123: '456',
        })
      })

      test('then it should return the base recipe id instead of the side recipe id', () => {
        const expected = '456'

        expect(
          recipeListSelectors.replaceSideRecipeIdWithBaseRecipeId.resultFunc(recipeId, recipeSides),
        ).toEqual(expected)
      })
    })

    describe('When recipesId is not a side recipe', () => {
      beforeEach(() => {
        recipeId = '123'
        recipeSides = Immutable.Map({
          789: '987',
        })
      })

      test('then it should return the passed in recipeId', () => {
        const expected = '123'
        expect(
          recipeListSelectors.replaceSideRecipeIdWithBaseRecipeId.resultFunc(recipeId, recipeSides),
        ).toEqual(expected)
      })
    })
  })
})
