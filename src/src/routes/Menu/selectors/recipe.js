import { createSelector } from 'reselect'
import { getRecipes, getStock, getBasket } from 'selectors/root'
import { formatRecipeTitle } from 'utils/recipe'
import { getNumPortions } from 'selectors/basket'
import config from 'config/menu'

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

const getRecipeIdInBasket = createSelector(
  [getBasket, getRecipeIdFromProps],
  (basket, recipeId) => basket.hasIn(['recipes', recipeId])
)

export const getRecipeOutOfStock = createSelector(
  [getRecipeIdFromProps, getStock, getNumPortions, getRecipeIdInBasket],
  (recipeId, menuRecipeStock, numPortions, inBasket) => {
    const stock = menuRecipeStock.getIn([recipeId, String(numPortions)], 0)

    return (stock <= config.stockThreshold && stock !== null && !inBasket)
  })

const getTagBySlugFromProps = (state, props) => props.slug
const getAllTags = ({ brand }) => (brand && brand.data && brand.data.tags ? brand.data.tags : [])

const findTag = (allTags, tag) => {
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
  (allTags, tag) => findTag(allTags, tag)
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
