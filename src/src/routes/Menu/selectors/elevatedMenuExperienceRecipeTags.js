import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'

import {
  getAllTags,
  findTag,
  getRecipeIdFromProps,
  getRecipeIsFineDineIn,
  getRecipeIsEverydayFavourites,
  getRecipeIsHealthKitchen,
} from './recipe'

const ALLOWED_PROMOTIONS = [
  'joe-wicks-eme',
  'limited-edition-eme',
]

const getBrandFromState = (state) => state.brand

export const getElevatedMenuExperienceRecipeTags = createSelector(
  getRecipes,
  getRecipeIdFromProps,
  getBrandFromState,
  getRecipeIsFineDineIn,
  getRecipeIsEverydayFavourites,
  getRecipeIsHealthKitchen,
  (
    allRecipes,
    recipeId,
    brand,
    isFineDineIn,
    isEverydayFavourites,
    isHealthKitchen,
  ) => {
    const recipe = allRecipes.get(recipeId)

    if (!recipe || !brand) {
      return null
    }

    const promotions = recipe.get('promotions')
    let topLeftTagId
    let topRightTagId
    let promotion

    if (ALLOWED_PROMOTIONS.includes(promotions.get(0))) {
      promotion = promotions.get(0)
    }

    switch (true) {
    case isHealthKitchen === true:
      promotion = 'health-kitchen-eme'
      break
    case isFineDineIn === true:
      promotion = 'fine-dine-in-eme'
      break
    case isEverydayFavourites === true:
      promotion = 'available-weekly-eme'
      break

    default:
      break
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
