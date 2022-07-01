import { TransformedRecipe } from '../../transformer'

import { orderCollectionRecipesByCuisine } from './personalisedSignupExperiment'

describe('orderCollectionRecipesByCuisine', () => {
  const recipes = [
    {
      recipe: { id: 'aaaa', cuisine: 'british' } as TransformedRecipe,
      originalId: 'aaaa',
      reference: 'a',
    },
    {
      recipe: { id: 'bbbb', cuisine: 'vietnamese' } as TransformedRecipe,
      originalId: 'bbbb',
      reference: 'a',
    },
    {
      recipe: { id: 'cccc', cuisine: 'french' } as TransformedRecipe,
      originalId: 'cccc',
      reference: 'c',
    },
    {
      recipe: { id: 'dddd', cuisine: 'greek' } as TransformedRecipe,
      originalId: 'dddd',
      reference: 'd',
    },
    {
      recipe: { id: 'eeee', cuisine: 'punjabi' } as TransformedRecipe,
      originalId: 'eeee',
      reference: 'e',
    },
    {
      recipe: { id: 'ffff', cuisine: 'moroccan' } as TransformedRecipe,
      originalId: 'ffff',
      reference: 'f',
    },
  ]

  test('the recipes that match the selected cuisines should be at the top of the list', () => {
    const selectedCuisines = ['mediterranean', 'east asian']

    const orderedRecipes = [
      { recipe: recipes[1].recipe, originalId: recipes[1].originalId },
      { recipe: recipes[3].recipe, originalId: recipes[3].originalId },
      { recipe: recipes[5].recipe, originalId: recipes[5].originalId },
      { recipe: recipes[0].recipe, originalId: recipes[0].originalId },
      { recipe: recipes[2].recipe, originalId: recipes[2].originalId },
      { recipe: recipes[4].recipe, originalId: recipes[4].originalId },
    ]
    const trackingData = ['bbbb', 'dddd', 'ffff']
    expect(orderCollectionRecipesByCuisine(recipes, selectedCuisines)).toEqual({
      orderedRecipes,
      trackingData,
    })
  })
})
