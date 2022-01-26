import { createSelector } from 'reselect'

const getHelpSelector = ({ getHelp }) => getHelp

export const getRecipes = createSelector(
  getHelpSelector,
  (getHelp) => getHelp.get('recipes').toJS()
)

export const getSelectedRecipeCards = createSelector(
  getHelpSelector,
  (getHelp) => getHelp.get('selectedRecipeCards').toJS()
)

export const getSelectedRecipeCardsDetails = createSelector(
  getSelectedRecipeCards,
  getRecipes,
  (recipeIds, recipes) => recipes.filter(({ id }) => recipeIds.includes(id))
)

export const getSelectedRecipeCardIssues = createSelector(
  getHelpSelector,
  (getHelp) => getHelp.get('selectedRecipeCardIssues').toJS()
)
