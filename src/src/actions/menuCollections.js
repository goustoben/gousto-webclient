import Immutable from 'immutable'
import logger from 'utils/logger'
import { fetchCollections } from 'apis/collections'
import { limitReached } from 'utils/basket'
import { isAllRecipes, getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { menuCollectionsReceive } from 'actions/menu'
import { collectionFilterChange } from 'actions/filters'
import { loadRecipesForSingleCollection } from 'actions/loadRecipesForSingleCollection'
import { actionTypes } from './actionTypes'

const menuLoadCollections = (date, noUrlChange, transformedCollections) => async (dispatch, getState) => {
  const state = getState()
  const accessToken = state.auth.get('accessToken')
  const args = {
    filters: {
      available_on: date,
    },
  }

  let collections = transformedCollections
  if (!collections) {
    const response = await fetchCollections(accessToken, '', args)
    collections = response.data
  }

  dispatch(menuCollectionsReceive(collections))

  if (!noUrlChange) {
    let changeCollection = true
    const prevLoc = getState().routing.locationBeforeTransitions
    if (prevLoc && prevLoc.query && prevLoc.query.collection) {
      if (getCollectionIdWithName(getState(), prevLoc.query.collection)) {
        changeCollection = false
      }
    }
    const preferredCollection = Immutable.Iterable.isIterable(getState().features) ? getState().features.getIn(['preferredCollection', 'value']) : ''
    const preferredCollectionId = getCollectionIdWithName(getState(), preferredCollection)

    if (changeCollection && getState().menuCollections.size > 0) {
      const recommendations = getState().menuCollections.find(collection => collection.get('slug') === 'recommendations')
      let landingCollectionId = preferredCollectionId || getDefaultCollectionId(getState())

      if (recommendations) {
        landingCollectionId = recommendations.get('id')
      }

      collectionFilterChange(landingCollectionId)(dispatch, getState)
    }
  }
}

const loadRecipesForAllCollections = (transformedRecipes, transformedCollectionRecipes) => (dispatch, getState) => {
  const allRecipesCollections = getState().menuCollections.filter(isAllRecipes)
  const ids = Array.from(getState().menuCollections.keys())

  let allRecipesCollectionId
  if (allRecipesCollections.size > 0) {
    allRecipesCollectionId = allRecipesCollections.first().get('id')
  }

  return Promise.all(
    ids.map(id => loadRecipesForSingleCollection(id, id !== allRecipesCollectionId || !allRecipesCollectionId, transformedRecipes, transformedCollectionRecipes)(dispatch, getState))
  )
    .then(() => {
      const state = getState()
      const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
      dispatch({
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: reachedLimit,
      })
    })
    .catch((err) => {
      logger.error({ message: 'Failed to load recipes for collections', errors: [err] })
    })
}

export {
  menuLoadCollections,
  loadRecipesForAllCollections
}
