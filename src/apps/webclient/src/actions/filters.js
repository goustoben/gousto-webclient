import { push } from 'react-router-redux'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { actionTypes } from './actionTypes'
import { trackProductFiltering } from './products'
import { getDisplayedCollections } from '../routes/Menu/selectors/collections'

export const filtersCollectionChange = (collectionName, collectionId) => ({
  type: actionTypes.FILTERS_COLLECTION_CHANGE,
  collectionName,
  collectionId,
  trackingData: {
    actionType: actionTypes.RECIPE_COLLECTION_SELECTED,
    collectionId
  }
})

export const collectionFilterIdReceive = (collectionId) => ({
  type: actionTypes.FILTERS_COLLECTION_CHANGE,
  collectionId
})

export function collectionFilterChange(collectionId) {
  return (dispatch, getState) => {
    const prevLoc = getState().routing.locationBeforeTransitions
    const query = { ...prevLoc.query }

    const navCollections = getDisplayedCollections(getState())
    const matchingNavCollection = navCollections.some((collection) => collection.get('id') === collectionId)

    if (!matchingNavCollection) {
      return
    }

    const collectionName = getState().menuCollections.getIn([ collectionId, 'slug' ], '')
    if (collectionName) {
      query.collection = collectionName
    } else if (query.collection) {
      delete query.collection
    }

    if (collectionName) {
      dispatch(filtersCollectionChange(collectionName, collectionId))

      if (collectionName !== prevLoc.query.collection) {
        const newLoc = { ...prevLoc, query }
        dispatch(push(newLoc))
      }
    }
  }
}

export const changeCollectionById = (id = ALL_RECIPES_COLLECTION_ID) => (
  (dispatch) => {
    dispatch(collectionFilterChange(id))
  }
)

export const filterProductCategory = (eventName, eventAction, eventType, primaryCategory, productsPerCategory, categoryId) => (
  (dispatch) => {
    dispatch({ type: 'FILTERS_PRODUCT_CATEGORY', value: categoryId })
    dispatch(trackProductFiltering(eventName, eventAction, eventType, primaryCategory, productsPerCategory))
  }
)

export default {
  collectionFilterChange,
  collectionFilterIdReceive,
  changeCollectionById
}
