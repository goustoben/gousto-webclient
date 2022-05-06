import { createSelector } from 'reselect'
import { getMenuRecipeIds, getStock } from 'selectors/root'
import { getBasketRecipes, getNumPortions } from 'selectors/basket'
import { getRecipeById, getRecipeTitle, getRecipeImages } from 'selectors/recipe'
import { okRecipes } from 'utils/basket'

export const getOkRecipeIds = createSelector(
  getBasketRecipes,
  getMenuRecipeIds,
  getStock,
  getNumPortions,
  (basketRecipes, menuRecipeIds, stock, numPortions) =>
    okRecipes(basketRecipes, menuRecipeIds, stock, numPortions),
)

export const getUnavailableRecipeIds = createSelector(
  getBasketRecipes,
  getOkRecipeIds,
  (basketRecipes, okRecipeIds) =>
    basketRecipes.filter((obj, recipeId) => !okRecipeIds.has(recipeId)),
)

export const getFormatedRulesMessage = (state, rules) => {
  const rulesToDisplay = []
  rules.forEach((rule) => {
    const recipesForRule = []
    rule.items.forEach((item) => {
      const recipe = getRecipeById(state, item)
      if (recipe) {
        recipesForRule.push({
          title: getRecipeTitle(recipe),
          imageUrl: getRecipeImages(recipe).getIn([0, 'src'], ''),
        })
      }
    })
    rulesToDisplay.push({
      description: rule.message,
      recipes: recipesForRule,
    })
  })

  return rulesToDisplay
}
