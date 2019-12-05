import { push } from 'react-router-redux'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import config from 'config/recipes'
import { getAllRecipesCollectionId } from 'routes/Menu/selectors/filters'
import { getCollectionDetailsBySlug } from 'selectors/collections'
import actionTypes from './actionTypes'
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

export const collectionFilterIdRecieve = (collectionId) => ({
  type: actionTypes.FILTERS_COLLECTION_CHANGE,
  collectionId,
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

export const filterProductCategory = (category) => (
  (dispatch) => {
    dispatch({ type: 'FILTERS_PRODUCT_CATEGORY', value: category })
    dispatch(trackProductFiltering(category))
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
  if (thematicSlug === null) {
    delete query.thematic
  } else {
    if (query.collection) {
      delete query.collection
    }
    const thematicCollection = getCollectionDetailsBySlug(getState(), thematicSlug)

    if (thematicCollection) {
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
    if (location === 'foodBrand') {
      if (recipeGrouping !== null) {
        recipeGrouping.location = location
      }
      selectFoodBrand(dispatch, getState, recipeGrouping)
      dispatch(changeCollectionById())
    }

    if (location === 'thematic') {
      selectThematic(dispatch, getState, recipeGrouping, onAction)
      dispatch(changeCollectionById())
    }
  }
)

export default {
  collectionFilterChange,
  collectionFilterIdRecieve,
  currentFoodBrandChange,
  currentThematicChange,
  filterRecipeGrouping,
  changeCollectionById
}
