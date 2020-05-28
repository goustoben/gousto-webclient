import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'
import { isNew } from 'utils/recipe'
import { InfoBadgeSlugs } from '../Recipe/InfoBadge'

export const getRecipeInfoBadgeSlugs = createSelector(
  [getRecipes, (state, props) => props.recipeId],
  (allRecipes, recipeId) => {
    const recipe = allRecipes.get(recipeId)

    if (!recipe) {
      return []
    }

    const slugs = []

    const isChefPrepared = recipe.get('chefPrepared') === true

    if (isChefPrepared) {
      slugs.push(InfoBadgeSlugs.OVEN_READY)
    }

    const ratingCount = recipe.getIn(['rating', 'count'], 0)
    if (ratingCount === 0 && isNew(recipe)) {
      slugs.push(InfoBadgeSlugs.NEW_RECIPE)
    }

    const promotions = recipe.get('promotions')

    if (promotions) {
      promotions.forEach(slug => slugs.push(slug))
    }

    return slugs
  }
)
