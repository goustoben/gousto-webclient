import { push } from 'react-router-redux'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { actionTypes } from './actionTypes'
import {
  trackCTAToAllRecipesClicked,
} from './tracking'
import { trackProductFiltering } from './products'

const filtersCollectionChange = (collectionName, collectionId) => ({
  type: actionTypes.FILTERS_COLLECTION_CHANGE,
  collectionName,
  collectionId,
  trackingData: {
    actionType: actionTypes.RECIPE_COLLECTION_SELECTED,
    collectionId,
  },
})

export const collectionFilterIdReceive = (collectionId) => ({
  type: actionTypes.FILTERS_COLLECTION_CHANGE,
  collectionId,
})

export function collectionFilterChange(collectionId) {
  return (dispatch, getState) => {
    const prevLoc = getState().routing.locationBeforeTransitions
    const query = { ...prevLoc.query }
    const collectionName = getState().menuCollections.getIn([collectionId, 'slug'], '')
    if (collectionName) {
      query.collection = collectionName
    } else {
      if (query.collection) {
        delete query.collection
      }
    }

    if (collectionName) {
      dispatch(filtersCollectionChange(collectionName, collectionId))
    }

    if (!!collectionName && collectionName !== prevLoc.query.collection) {
      const newLoc = { ...prevLoc, query }
      dispatch(push(newLoc))
    }
  }
}

export const changeCollectionById = (id = ALL_RECIPES_COLLECTION_ID) => (
  (dispatch) => {
    dispatch(filtersCollectionChange(null, id))
  }
)

export const changeCollectionToAllRecipesViaCTA = () => (
  (dispatch) => {
    dispatch(collectionFilterChange(ALL_RECIPES_COLLECTION_ID))
    dispatch(trackCTAToAllRecipesClicked())
  }
)

export const filterProductCategory = (category) => (
  (dispatch) => {
    dispatch({ type: 'FILTERS_PRODUCT_CATEGORY', value: category })
    dispatch(trackProductFiltering(category))
  }
)

export default {
  collectionFilterChange,
  collectionFilterIdReceive,
  changeCollectionById
}
