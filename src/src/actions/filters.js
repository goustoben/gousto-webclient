import { push } from 'react-router-redux'

import actionTypes from './actionTypes'
import { getAllRecipesCollectionId } from 'routes/Menu/selectors/filters.js'
import { slugify } from 'utils/url'

import {
  trackRecipeFiltersOpened,
  trackRecipeFiltersClosed,
  trackRecipeFiltersCleared,
  trackRecipeCollectionSelected,
  trackRecipeTypeSelected,
  trackRecipeTypeUnselected,
  trackRecipeDietaryAttributeSelected,
  trackRecipeDietaryAttributeUnselected,
  trackRecipeTotalTimeSelected,
  trackRecipeFiltersApplied,
} from './tracking'

const filtersVisibilityChange = (visible = true) => ({
  type: actionTypes.MENU_FILTERS_VISIBILITY_CHANGE,
  visible,
})

const filtersCollectionChange = (collectionName, collectionId) => ({
  type: actionTypes.FILTERS_COLLECTION_CHANGE,
  collectionName,
  collectionId,
  trackingData: {
    actionType: actionTypes.FILTERS_COLLECTION_CHANGE,
    collectionId,
  },
})

export const collectionFilterIdRecieve = (collectionId) => ({
  type: actionTypes.FILTERS_COLLECTION_CHANGE,
  collectionId,
})
export const currentDietTypesChange = (dietTypes) => ({
  type: actionTypes.FILTERS_DIET_TYPES_CHANGE,
  dietTypes,
})

export const currentDietaryAttributesChange = (dietaryAttributes) => ({
  type: actionTypes.FILTERS_DIETARY_ATTRIBUTES_CHANGE,
  dietaryAttributes,
})

const currentTotalTimeChange = (totalTime) => ({
  type: actionTypes.FILTERS_TOTAL_TIME_CHANGE,
  totalTime,
})

export const filtersClearAll = (collectionId) => ({
  type: actionTypes.FILTERS_CLEAR_ALL,
  collectionId,
})

const filterMenuRevert = () => ({
  type: actionTypes.FILTERS_RESET,
})

export function collectionFilterChange(collectionId) {
  return (dispatch, getState) => {
    const prevLoc = getState().routing.locationBeforeTransitions
    const query = { ...prevLoc.query }
    const collectionName = slugify(getState().menuCollections.getIn([collectionId, 'shortTitle'], ''))
    if (collectionName) {
      query.collection = collectionName
    } else {
      if (query.collection) {
        delete query.collection
      }
    }

    dispatch(filtersCollectionChange(collectionName, collectionId))

    if (collectionName !== prevLoc.query.collection) {
      const newLoc = { ...prevLoc, query }
      dispatch(push(newLoc))
    }
  }
}

export const filterMenuOpen = () => (
  (dispatch) => {
    dispatch(filtersVisibilityChange(true))
    dispatch(trackRecipeFiltersOpened())
  }
)

const filterMenuClose = () => (
  (dispatch) => {
    dispatch(filtersVisibilityChange(false))
    dispatch(trackRecipeFiltersClosed())
  }
)

const filterMenuApply = () => (
  (dispatch, getState) => {
    dispatch(filtersVisibilityChange(false))
    dispatch(trackRecipeFiltersApplied(
      getState().filters.get('currentCollectionId'),
      Array.from(getState().filters.get('dietTypes', [])),
      Array.from(getState().filters.get('dietaryAttributes', [])),
      getState().filters.get('totalTime'),
    ))
  }
)

const filterCollectionChange = (collectionId) => (
  (dispatch) => {
    dispatch(collectionFilterChange(collectionId))
    dispatch(trackRecipeCollectionSelected(collectionId))
  }
)

export const filterCurrentDietTypesChange = (dietType) => (
  (dispatch, getState) => {
    const dietTypes = getState().filters.get('dietTypes')
    let newDietTypes

    if (dietTypes.has(dietType)) {
      newDietTypes = dietTypes.filterNot(dietTypeSelected => (dietTypeSelected === dietType))
      dispatch(trackRecipeTypeUnselected(dietType))
    } else {
      newDietTypes = dietTypes.add(dietType)
      dispatch(trackRecipeTypeSelected(dietType))
    }
    dispatch(currentDietTypesChange(newDietTypes))
  }
)

export const filterCurrentTotalTimeChange = (totalTime) => (
  (dispatch) => {
    dispatch(currentTotalTimeChange(totalTime))
    dispatch(trackRecipeTotalTimeSelected(totalTime))
  }
)

export const clearAllFilters = () => (
  (dispatch, getState) => {
    const defaultCollection = getAllRecipesCollectionId(getState())
    dispatch(filtersClearAll(defaultCollection))
    dispatch(trackRecipeFiltersCleared())
  }
)

export const filterDietaryAttributesChange = (dietaryAttribute) => (
  (dispatch, getState) => {
    const dietaryAttributes = getState().filters.get('dietaryAttributes')
    let newDietaryAttributes

    if (dietaryAttributes.has(dietaryAttribute)) {
      newDietaryAttributes = dietaryAttributes.filterNot((_dietaryAttribute) => (
        _dietaryAttribute === dietaryAttribute
      ))
      dispatch(trackRecipeDietaryAttributeUnselected(dietaryAttribute))
    } else {
      newDietaryAttributes = dietaryAttributes.add(dietaryAttribute)
      dispatch(trackRecipeDietaryAttributeSelected(dietaryAttribute))
    }
    dispatch(currentDietaryAttributesChange(newDietaryAttributes))
  }
)

export const filterMenuRevertFilters = () => (
  (dispatch) => {
    dispatch(filterMenuRevert())
    dispatch(filtersVisibilityChange(false))
  }
)

export default {
  filtersVisibilityChange,
  filterMenuOpen,
  filterMenuClose,
  filterMenuApply,
  clearAllFilters,
  filterCollectionChange,
  collectionFilterChange,
  collectionFilterIdRecieve,
  filterCurrentDietTypesChange,
  filterDietaryAttributesChange,
  filterCurrentTotalTimeChange,
  filterMenuRevertFilters,
}
