import { fromJS } from 'immutable'
import { getSelectedRecipeCardsDetails, getRecipes, getSelectedRecipeCards } from '../recipesSelectors'

describe('recipesSelector', () => {
  const RECIPES = [{
    id: '2871',
    title: 'Cheesy Pizza-Topped Chicken With Mixed Salad',
    ingredients: [
      {
        uuid: 'd93301c4-2563-4b9d-b829-991800ca87b4',
        label: '40g Cornish clotted cream',
        urls: [
          {
            url: 'ingredient-cornish-image-url',
            width: 50,
          },
        ]
      },
    ],
    goustoReference: '2145',
  },
  {
    id: '385',
    title: 'Recipe 2',
    ingredients: [
      {
        uuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
        label: '8ml soy sauce',
        urls: [
          {
            url: 'ingredient-soy-image-url',
            width: 50,
          },
        ]
      },
    ],
    goustoReference: '354',
  }]
  const SELECTED_RECIPE_CARDS = ['385']
  const state = {
    getHelp: fromJS({
      recipes: RECIPES,
      selectedRecipeCards: SELECTED_RECIPE_CARDS,
    })
  }

  let result
  describe.each([
    ['getSelectedRecipeCardsDetails', getSelectedRecipeCardsDetails, [RECIPES[1]]],
    ['getSelectedRecipeCards', getSelectedRecipeCards, SELECTED_RECIPE_CARDS],
    ['getRecipes', getRecipes, RECIPES],
  ])('Given %s is called', (_selectorName, selector, expectedResult) => {
    beforeEach(() => {
      result = selector(state)
    })

    test('gets the corresponding value from the store', () => {
      expect(result).toEqual(expectedResult)
    })
  })
})
