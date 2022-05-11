import Immutable from 'immutable'
import { orderCollectionRecipesByCuisine } from './personalisedSignupExperiment'

describe('orderCollectionRecipesByCuisine', () => {
  const recipes = Immutable.List([
    {
      recipe: Immutable.Map({ id: 'aaaa', cuisine: 'british' }),
      originalId: 'aaaa',
    },
    {
      recipe: Immutable.Map({ id: 'bbbb', cuisine: 'vietnamese' }),
      originalId: 'bbbb',
    },
    {
      recipe: Immutable.Map({ id: 'cccc', cuisine: 'french' }),
      originalId: 'cccc',
    },
    {
      recipe: Immutable.Map({ id: 'dddd', cuisine: 'greek' }),
      originalId: 'dddd',
    },
    {
      recipe: Immutable.Map({ id: 'eeee', cuisine: 'punjabi' }),
      originalId: 'eeee',
    },
    {
      recipe: Immutable.Map({ id: 'ffff', cuisine: 'moroccan' }),
      originalId: 'ffff',
    },
  ])

  test('the recipes that match the selected cuisines should be at the top of the list', () => {
    const selectedCuisines = ['mediterranean', 'east asian']

    const orderedRecipes = Immutable.List([
      { recipe: recipes.getIn([1]).recipe, originalId: recipes.getIn([1]).originalId },
      { recipe: recipes.getIn([3]).recipe, originalId: recipes.getIn([3]).originalId },
      { recipe: recipes.getIn([5]).recipe, originalId: recipes.getIn([5]).originalId },
      { recipe: recipes.getIn([0]).recipe, originalId: recipes.getIn([0]).originalId },
      { recipe: recipes.getIn([2]).recipe, originalId: recipes.getIn([2]).originalId },
      { recipe: recipes.getIn([4]).recipe, originalId: recipes.getIn([4]).originalId },
    ])
    const trackingData = ['bbbb', 'dddd', 'ffff']
    expect(orderCollectionRecipesByCuisine(recipes, selectedCuisines)).toEqual({
      orderedRecipes,
      trackingData,
    })
  })
})
