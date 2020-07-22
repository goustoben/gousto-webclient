import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'

import { getAllTags, findTag } from './recipe'

export const getElevatedMenuExperienceRecipeTags = createSelector(
  [getRecipes, (state, props) => ({ recipeId: props.recipeId, brand: state.brand })],
  (allRecipes, {recipeId, brand }) => {
    const recipe = allRecipes.get(recipeId)

    if (!recipe || !brand) {
      return null
    }

    const promotions = recipe.get('promotions')
    let topLeftTagId
    let topRightTagId
    let promotion

    if (promotions.get(0)) {
      promotion = promotions.get(0)
    }

    if (promotion && promotion !== 'limited-edition-eme') {
      topRightTagId = promotion
    }

    if (promotion === 'limited-edition-eme') {
      topLeftTagId = promotion
    } else if (recipe.get('isNew')) {
      topLeftTagId = 'new-eme'
    }

    const allTags = getAllTags({ brand })
    const topLeftTag = findTag(allTags, topLeftTagId)
    const topRightTag = findTag(allTags, topRightTagId)

    return {
      topLeftTag,
      topRightTag,
    }
  }
)
