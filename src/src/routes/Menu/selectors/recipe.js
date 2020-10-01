import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getRecipes, getStock, getBasket } from 'selectors/root'
import { formatRecipeTitle, getSurcharge, getSurchargePerPortion, getDietaryTags } from 'utils/recipe'
import { getNumPortions } from 'selectors/basket'
import menuConfig from 'config/menu'

export const getRecipeIdFromProps = (state, props) => props.recipeId

export const getRecipeTitle = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (allRecipes, recipeId) => {
    if (!recipeId) {
      return null
    }

    const recipe = allRecipes.get(recipeId)

    if (!recipe) {
      return null
    }

    return formatRecipeTitle(recipe.get('title'), recipe.get('boxType', ''), recipe.get('dietType', ''))
  }
)

export const getRecipeIsFineDineIn = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (allRecipes, recipeId) => {
    const recipe = allRecipes.get(recipeId)

    if (!recipe) {
      return false
    }

    return recipe.get('isFineDineIn')
  }
)

export const getRecipeIdInBasket = createSelector(
  [getBasket, getRecipeIdFromProps],
  (basket, recipeId) => basket.hasIn(['recipes', recipeId])
)

export const isOutOfStock = (recipeId, numPortions, recipesStock) => {
  if (recipesStock.size === 0) {
    return false
  }

  const stock = recipesStock.getIn([recipeId, String(numPortions)], 0)

  return (stock <= menuConfig.stockThreshold)
}

export const getRecipeOutOfStock = createSelector(
  [getRecipeIdFromProps, getStock, getNumPortions, getRecipeIdInBasket],
  (recipeId, menuRecipeStock, numPortions, inBasket) => (isOutOfStock(recipeId, numPortions, menuRecipeStock) && !inBasket)
)

export const getRecipeSurcharge = createSelector(
  [getRecipeIdFromProps, getNumPortions, getRecipes],
  (recipeId, numPortions, recipes) => {
    const meals = recipes.getIn([recipeId, 'meals'])
    const overallSurcharge = getSurcharge(meals, numPortions)
    const surchargePerPortion = overallSurcharge ? getSurchargePerPortion(overallSurcharge, numPortions) : null

    return surchargePerPortion
  }
)

export const getRecipeSidesSurcharge = createSelector(
  [getRecipeIdFromProps, getNumPortions, getRecipes],
  (recipeId, numPortions, recipes) => {
    const meals = recipes.getIn([recipeId, 'meals'])

    return getSurcharge(meals, numPortions)
  }
)

const getTagBySlugFromProps = (state, props) => props.slug
export const getAllTags = ({ brand }) => (brand && brand.data && brand.data.tags ? brand.data.tags : [])

export const findTag = (allTags, tag) => {
  const foundTag = allTags && allTags.find((tagData) => tagData.slug === tag)

  if (foundTag) {
    const foundTheme = foundTag.themes.find((theme) => theme.name === 'light')

    return {
      ...foundTag,
      themes: undefined,
      theme: foundTheme
    }
  }

  return null
}
export const getTagDefinition = createSelector(
  [getAllTags, getTagBySlugFromProps],
  (allTags, tag) => {
    const nonEmeTags = (allTags || []).filter((tagData) => !tagData.slug.endsWith('-eme'))

    return findTag(nonEmeTags, tag)
  }
)

const getClaimForRecipeId = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (recipes, recipeId) => {
    const recipeDetails = recipes.get(recipeId)

    if (!recipeDetails) {
      return null
    }

    const healthClaims = recipeDetails.getIn(['health', 'claims', 0], null)
    if (healthClaims) {
      return {
        disclaimer: healthClaims.get('disclaimer'),
        slug: healthClaims.get('slug')
      }
    }

    return null
  }
)

export const getRecipeDisclaimerProps = createSelector(
  [getClaimForRecipeId, getAllTags],
  (claim, allTags) => {
    if (!claim) {
      return null
    }

    return {
      disclaimer: claim.disclaimer,
      ...findTag(allTags, claim.slug)
    }
  }
)

export const getRecipeIngredientsProps = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (recipes, recipeId) => {
    const recipe = recipes.get(recipeId)

    if (!recipe) {
      return null
    }

    return recipe.get('ingredients', Immutable.List([]))
  }
)

export const getRecipeAllergensProps = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (recipes, recipeId) => {
    const recipe = recipes.get(recipeId)

    if (!recipe) {
      return null
    }

    return recipe.get('allergens', Immutable.List([]))
  }
)

export const getRecipePerPortionProps = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (recipes, recipeId) => {
    const recipe = recipes.get(recipeId)

    if (!recipe) {
      return null
    }

    return recipe.getIn(['nutritionalInformation', 'perPortion'], Immutable.Map({}))
  }
)

export const getRecipePer100gProps = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (recipes, recipeId) => {
    const recipe = recipes.get(recipeId)

    if (!recipe) {
      return null
    }

    return recipe.getIn(['nutritionalInformation', 'per100g'], Immutable.Map({}))
  }
)

export const getVariantsForRecipeForCurrentCollection = (variants, recipeId, menuRecipes, collectionDietaryClaims) => {
  if (!variants) {
    return null
  }

  const recipeVariants = variants.get(recipeId)

  if (!recipeVariants) {
    return null
  }

  const sides = recipeVariants.get('sides')

  if (sides && sides.size) {
    return { type: 'sides', sides, variantsList: sides }
  }

  const alternatives = recipeVariants.get('alternatives')

  if (!alternatives || !alternatives.size) {
    return null
  }

  if (!collectionDietaryClaims) {
    return { type: 'alternatives', alternatives, variantsList: alternatives }
  }

  const alternativesDietaryClaims = alternatives.filter((variant) => {
    const variantRecipeDietaryAttributes = getDietaryTags(menuRecipes.get(variant.get('coreRecipeId')))

    if (!variantRecipeDietaryAttributes || !variantRecipeDietaryAttributes.size) {
      return false
    }

    return (collectionDietaryClaims.every(claim => variantRecipeDietaryAttributes.includes(claim)))
  })

  return { type: 'alternatives', alternatives: alternativesDietaryClaims, variantsList: alternativesDietaryClaims }
}

export const getSelectedRecipeSidesFromMenu = (state) => state.menu.get('selectedRecipeSides')

export const getRecipeSelectedSides = createSelector(
  [getRecipeIdFromProps, getSelectedRecipeSidesFromMenu],
  (recipeId, selectedRecipeSides) => selectedRecipeSides[recipeId] || null
)

export const getTaglineByRecipeId = createSelector(
  [getRecipes, getRecipeIdFromProps],
  (recipes, recipeId) => {
    const recipe = recipes.get(recipeId)

    if (!recipe) {
      return null
    }

    return recipe.get('tagline')
  }
)
