import { createSelector } from 'reselect'
import { getNumPortions } from 'selectors/basket'
import { getCollectionIdWithName } from 'utils/collections'
import menuConfig from 'config/menu'

export const getCollectionId = collection => collection.get('id')
const getCollectionSlug = collection => collection.get('slug')
const isCollectionPublished = collection => Boolean(collection.get('published'))

const isCollectionDefault = collection => Boolean(collection.get('default'))
const isCollectionRecommendations = collection => getCollectionSlug(collection) === 'recommendations'

export const getMenuCollections = state => state.menuCollections
export const getMenuCollectionRecipes = state => state.menuCollectionRecipes
export const getMenuRecipeStock = state => state.menuRecipeStock
export const getCollectionSlugFromQuery = state => {
  if (
    !state.routing
    || !state.routing.locationBeforeTransitions
    || !state.routing.locationBeforeTransitions.query
    || !state.routing.locationBeforeTransitions.query.collection
  ) {
    return null
  }

  return state.routing.locationBeforeTransitions.query.collection
}

export const getRecommendationsCollection = createSelector(
  getMenuCollections,
  menuCollections => menuCollections.find(isCollectionRecommendations) || null
)

const collectionHasRecipes = (menuCollectionRecipes, collectionId) => {
  const recipes = menuCollectionRecipes.get(collectionId, null)

  if (!recipes) {
    return false
  }

  return recipes.size > 0
}

const isInStock = (recipeId, menuRecipeStock, numPortions) => {
  const stock = menuRecipeStock.getIn([recipeId, String(numPortions)], 0)

  return (stock > menuConfig.stockThreshold)
}

export const getDisplayedCollections = createSelector(
  getMenuCollections,
  getMenuCollectionRecipes,
  getMenuRecipeStock,
  getNumPortions,
  getRecommendationsCollection,
  (menuCollections, menuCollectionRecipes, menuRecipeStock, numPortions, recommendations) => {
    const collections = menuCollections.filter(
      collection => isCollectionPublished(collection) && collectionHasRecipes(menuCollectionRecipes, getCollectionId(collection))
    )

    if (!recommendations) {
      return collections
    }

    const recommendationsId = getCollectionId(recommendations)
    const { recommendationInStockRecipeThreshold } = menuConfig

    return collections.filter(collection => {
      const collectionId = getCollectionId(collection)

      if (collectionId !== recommendationsId) {
        return true
      }

      const collectionRecipes = menuCollectionRecipes.get(collectionId)

      let collectionRecipesInStock = 0

      // this loop below is so that we can short-circuit out as soon as we know that
      // there are enough in-stock recipes, rather than checking stock for all of them
      for (let i = 0; i < collectionRecipes.size; i++) {
        const recipeId = collectionRecipes.get(i)

        if (isInStock(recipeId, menuRecipeStock, numPortions)) {
          collectionRecipesInStock += 1
        }

        if (collectionRecipesInStock === recommendationInStockRecipeThreshold) {
          break
        }
      }

      return collectionRecipesInStock >= recommendationInStockRecipeThreshold
    })
  }
)

export const getDefaultCollection = state => {
  const collections = getDisplayedCollections(state)

  const defaultCollection = collections.find(isCollectionDefault)

  if (defaultCollection) {
    return defaultCollection
  }

  const recommendationsCollection = collections.find(isCollectionRecommendations)

  if (recommendationsCollection) {
    return recommendationsCollection
  }

  if (collections.size > 0) {
    return collections.first()
  }

  return null
}

export const getCurrentCollectionId = (state) => {
  const slug = getCollectionSlugFromQuery(state)

  if (slug) {
    const collectionId = getCollectionIdWithName(state, slug)

    if (collectionId) {
      return collectionId
    }
  }

  const defaultCollection = getDefaultCollection(state)

  if (defaultCollection) {
    return defaultCollection.get('id')
  }

  return null
}

export const getRecommendationShortName = createSelector(
  [getRecommendationsCollection],
  (recommendationCollection) => {
    const shortName = recommendationCollection && recommendationCollection.get('shortTitle')

    return shortName || ''
  }
)

export const isCurrentCollectionRecommendation = createSelector(
  [getCurrentCollectionId, getRecommendationsCollection],
  (currentCollectionId, recommendationsCollection) => (recommendationsCollection && getCollectionId(recommendationsCollection) === currentCollectionId)
)

export const getCurrentCollectionSlug = createSelector(
  [getCurrentCollectionId, getMenuCollections],
  (collectionId, menuCollections) => {
    const currentCollection = menuCollections.get(collectionId)
    const currentCollectionSlug = (currentCollection && currentCollection.get('slug')) || null

    return currentCollectionSlug
  }
)

export const getCurrentCollectionShortTitle = createSelector(
  [getCurrentCollectionId, getDisplayedCollections],
  (collectionId, collections) => (
    collections.getIn([
      collectionId,
      'shortTitle',
    ], 'All Recipes')
  )
)
