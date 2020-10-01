import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'

import {
  getAllTags,
  findTag,
  getRecipeIdFromProps,
  getTaglineByRecipeId,
} from './recipe'

const getBrandFromState = (state) => state.brand

export const getElevatedMenuExperienceRecipeTags = createSelector(
  getRecipes,
  getRecipeIdFromProps,
  getBrandFromState,
  (
    allRecipes,
    recipeId,
    brand,
  ) => {
    const recipe = allRecipes.get(recipeId)

    if (!recipe || !brand) {
      return null
    }

    const promotions = recipe.get('promotions')
    let topLeftTagId
    const promotionLimitedEditionEME = promotions.get(0) === 'limited-edition-eme'

    if (promotionLimitedEditionEME) {
      topLeftTagId = 'limited-edition-eme'
    } else if (recipe.get('isNew')) {
      topLeftTagId = 'new-eme'
    }

    const allTags = getAllTags({ brand })
    const topLeftTag = findTag(allTags, topLeftTagId)

    return {
      topLeftTag,
    }
  }
)

export const getBrandTagline = createSelector(
  getTaglineByRecipeId,
  getAllTags,
  (
    tagline,
    allTags,
  ) => {
    if (!tagline || !allTags) {
      return null
    }

    return findTag(allTags, tagline)
  })
