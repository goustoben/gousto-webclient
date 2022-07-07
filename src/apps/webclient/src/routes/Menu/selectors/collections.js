import { createSelector } from 'reselect'

import menuConfig from 'config/menu'
import { getNumPortions, getBasketMenuId } from 'selectors/basket'
import { getCollectionIdWithName } from 'utils/collections'

import { isOutOfStock } from './recipe'

export const getRecipesInCollection = (menuCollections, collectionId) =>
  menuCollections.getIn([collectionId, 'recipesInCollection'], null)

export const getCollectionId = (collection) => collection.get('id')
const getCollectionSlug = (collection) => collection.get('slug')
const isCollectionPublished = (collection) => Boolean(collection.get('published'))

const isCollectionDefault = (collection) => Boolean(collection.get('default'))
const isCollectionRecommendations = (collection) =>
  getCollectionSlug(collection) === 'recommendations'

export const getMenuCollections = (state) => {
  console.log('getMenuCollections', state)

  return state.menuCollections
}
export const getMenuRecipeStock = (state) => state.menuRecipeStock
export const getCollectionSlugFromQuery = (state) => {
  if (
    !state.routing ||
    !state.routing.locationBeforeTransitions ||
    !state.routing.locationBeforeTransitions.query ||
    !state.routing.locationBeforeTransitions.query.collection
  ) {
    return null
  }

  return state.routing.locationBeforeTransitions.query.collection
}

export const getRecommendationsCollection = createSelector(
  getMenuCollections,
  (menuCollections) => menuCollections.find(isCollectionRecommendations) || null,
)

const collectionHasRecipes = (menuCollections, collectionId) => {
  const recipes = getRecipesInCollection(menuCollections, collectionId)

  if (!recipes) {
    return false
  }

  return recipes.size > 0
}

export const getDisplayedCollections = createSelector(
  getMenuCollections,
  getMenuRecipeStock,
  getNumPortions,
  getRecommendationsCollection,
  (menuCollections, menuRecipeStock, numPortions, recommendations) => {
    console.log('getDisplayedCollections', menuCollections)
    const collections = menuCollections.filter(
      (collection) =>
        isCollectionPublished(collection) &&
        collectionHasRecipes(menuCollections, getCollectionId(collection)),
    )

    if (!recommendations) {
      return collections
    }

    const recommendationsId = getCollectionId(recommendations)
    const { recommendationInStockRecipeThreshold } = menuConfig

    return collections.filter((collection) => {
      const collectionId = getCollectionId(collection)

      if (collectionId !== recommendationsId) {
        return true
      }

      const collectionRecipes = getRecipesInCollection(menuCollections, collectionId) || []

      let collectionRecipesInStock = 0

      // this loop below is so that we can short-circuit out as soon as we know that
      // there are enough in-stock recipes, rather than checking stock for all of them
      for (let i = 0; i < collectionRecipes.size; i++) {
        const recipeId = collectionRecipes.get(i)

        if (!isOutOfStock(recipeId, numPortions, menuRecipeStock)) {
          collectionRecipesInStock += 1
        }

        if (collectionRecipesInStock === recommendationInStockRecipeThreshold) {
          break
        }
      }

      return collectionRecipesInStock >= recommendationInStockRecipeThreshold
    })
  },
)

export const getDefaultCollection = (state) => {
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

export const getCurrentCollectionId = (state, props) => {
  if (props && props.categoryId) {
    // eslint-disable-line
    return props.categoryId
  }

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
  },
)

export const isCurrentCollectionRecommendation = createSelector(
  [getCurrentCollectionId, getRecommendationsCollection],
  (currentCollectionId, recommendationsCollection) =>
    recommendationsCollection && getCollectionId(recommendationsCollection) === currentCollectionId,
)

export const getCurrentCollectionSlug = createSelector(
  [getCurrentCollectionId, getMenuCollections],
  (collectionId, menuCollections) => {
    const currentCollection = menuCollections.get(collectionId)
    const currentCollectionSlug = (currentCollection && currentCollection.get('slug')) || null

    return currentCollectionSlug
  },
)

const getCollectionsPerMenuFromProps = (_, { collectionsPerMenu }) => collectionsPerMenu

const getCurrentMenuCollectionsWithHeaders = createSelector(
  [getCollectionsPerMenuFromProps, getBasketMenuId],
  (collectionsPerMenu, menuId) => {
    const currentMenuCollections =
      collectionsPerMenu && collectionsPerMenu.find((menu) => menu.id === menuId)
    if (currentMenuCollections) {
      return currentMenuCollections.relationships.collections.data
    }

    return null
  },
)

const getHeadersFromProps = (_, { headers }) => headers

export const getCollectionsHeaders = createSelector(
  [getCurrentMenuCollectionsWithHeaders, getCurrentCollectionId, getHeadersFromProps],
  (collectionWithHeaders, collectionId, headers) => {
    const collectionInfo =
      collectionWithHeaders &&
      collectionWithHeaders.find((collection) => collection.id === collectionId)
    if (collectionInfo && headers) {
      return headers.find((header) => header.id === collectionInfo.header)
    }

    return null
  },
)

export const getCurrentCollectionThumbnail = createSelector(
  [getMenuCollections, getCurrentCollectionId],
  (menuCollections, currentCollectionId) =>
    menuCollections.getIn([currentCollectionId, 'thumbnail'], null),
)
