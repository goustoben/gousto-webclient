import { createSelector } from 'reselect'

export const getRecipes = (state) => (
  state.getHelp.get('recipes').toJS()
)

export const getSelectedRecipeCards = (state) => state.getHelp.get('selectedRecipeCards').toJS()

export const getSelectedRecipeCardsDetails = createSelector(
  getSelectedRecipeCards,
  getRecipes,
  (recipeIds, recipes) => recipes.filter(({ id }) => recipeIds.includes(id))
)
