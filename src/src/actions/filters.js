import { push } from 'react-router-redux'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import config from 'config/recipes'
import { getAllRecipesCollectionId } from 'routes/Menu/selectors/filters'
import { getCollectionDetailsBySlug } from 'selectors/collections'
import actionTypes from './actionTypes'
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
  trackRecipeTotalTimeUnselected,
  trackRecipeFiltersApplied,
  trackCTAToAllRecipesClicked,
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
    actionType: actionTypes.RECIPE_COLLECTION_SELECTED,
    collectionId,
  },
})

const currentTotalTimeChange = (totalTime) => ({
  type: actionTypes.FILTERS_TOTAL_TIME_CHANGE,
  totalTime,
})

const filterNewRecipesChange = (newRecipesSelected) => ({
  type: actionTypes.FILTERS_NEW_RECIPES_CHANGE,
  trackingData: {
    actionType: newRecipesSelected ? 'UNSELECT_FILTERS_NEW_RECIPES': 'SELECT_FILTERS_NEW_RECIPES',
  }
})

const filterMenuRevert = () => ({
  type: actionTypes.FILTERS_RESET,
})

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

export const currentFoodBrandChange = (foodBrand) => ({
  type: actionTypes.FILTERS_FOOD_BRAND_CHANGE,
  foodBrand,
  trackingData: {
    actionType: foodBrand !== null ? 'FoodBrand selected' : 'FoodBrand unselected',
    food_brand: foodBrand !== null ? foodBrand.slug : ''
  }
})

export const currentThematicChange = (thematic, onAction) => ({
  type: actionTypes.FILTERS_THEMATIC_CHANGE,
  thematic,
  trackingData: {
    actionType: thematic !== null ? 'Thematic selected' : 'Thematic unselected',
    thematic: thematic !== null ? thematic.slug : '',
    onAction
  }
})

export const filtersClearAll = (collectionId) => ({
  type: actionTypes.FILTERS_CLEAR_ALL,
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

    if (!!collectionName) {
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

export const filterMenuOpen = () => (
  (dispatch) => {
    dispatch(filtersVisibilityChange(true))
    dispatch(trackRecipeFiltersOpened())
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
  (dispatch, getState) => {
    const totalTimeSelected = getState().filters.get('totalTime')
    if (totalTimeSelected === totalTime) {
      dispatch(currentTotalTimeChange('0'))
      dispatch(trackRecipeTotalTimeUnselected(totalTime))
    } else {
      dispatch(currentTotalTimeChange(totalTime))
      dispatch(trackRecipeTotalTimeSelected(totalTime))
    }
  }
)

export const clearAllFilters = () => (
  (dispatch, getState) => {
    const getSelectedCollection = getState().filters.get('currentCollectionId') || getAllRecipesCollectionId(getState())
    dispatch(filtersClearAll(getSelectedCollection))
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

export const filterProductCategory = (category) => (
  (dispatch) => {
    dispatch({ type: 'FILTERS_PRODUCT_CATEGORY', value: category })
  }
)

export const filterApply = (type, value) => (
  (dispatch, getState) => {
    const { filters } = getState()
    const newRecipesSelected = filters.get('newRecipes')

    switch (type) {
    case 'totalTime':
      dispatch(filterCurrentTotalTimeChange(value))
      break
    case 'newRecipes':
      dispatch(filterNewRecipesChange(newRecipesSelected))
      break
    default:
      break
    }
  }
)

const selectFoodBrand = (dispatch, getState, recipeGrouping) => {
  const { routing } = getState()
  const previousLocation = routing.locationBeforeTransitions
  const query = { ...previousLocation.query }

  dispatch(currentFoodBrandChange(recipeGrouping))
  if (recipeGrouping === null) {
    delete query.foodBrand
  } else {
    query.foodBrand = recipeGrouping.slug
    if (query.collection) {
      delete query.collection
    }
  }

  const newLocation = { ...previousLocation, query }
  dispatch(push(newLocation))
}

const selectThematic = (dispatch, getState, thematicSlug, onAction) => {
  const { routing } = getState()
  const previousLocation = routing.locationBeforeTransitions
  const query = { ...previousLocation.query }
  let thematic = thematicSlug
  if(thematicSlug === null) {
    delete query.thematic
  } else {
    if (query.collection) {
      delete query.collection
    }
    const thematicCollection = getCollectionDetailsBySlug(getState(), thematicSlug)

    if(thematicCollection) {
      thematic = {
        name: thematicCollection.get('shortTitle'),
        slug: thematicSlug,
        borderColor: config.thematicBorderColor,
        location: 'thematic'
      }
      query.thematic = thematicSlug
    } else {
      thematic = null
    }
  }

  dispatch(currentThematicChange(thematic, onAction))
  const newLocation = { ...previousLocation, query }
  dispatch(push(newLocation))
}

export const filterRecipeGrouping = (recipeGrouping, location, onAction = null) => (
  (dispatch, getState) => {
    const { features } = getState()
    const foodBrandFeature = features.getIn(['foodBrand', 'value'])
    const thematicFeature = features.getIn(['thematic', 'value'])

    if (foodBrandFeature && location === 'foodBrand') {
      if(recipeGrouping !== null) {
        recipeGrouping.location = location
      }
      selectFoodBrand(dispatch, getState, recipeGrouping)
    }

    if (thematicFeature && location === 'thematic') {
      selectThematic(dispatch, getState, recipeGrouping, onAction)
    }

    if(foodBrandFeature || thematicFeature) {
      dispatch(changeCollectionById())
    }
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
  filterApply,
  currentFoodBrandChange,
  filterRecipeGrouping,
  changeCollectionById
}
