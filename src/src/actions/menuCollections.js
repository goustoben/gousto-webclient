import Immutable from 'immutable'
import { fetchCollections } from 'apis/collections'
import { featureSet } from 'actions/features'
import { limitReached } from 'utils/basket'
import { isAllRecipes, getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { menuCollectionsReceive } from 'actions/menu'
import { collectionFilterChange } from 'actions/filters'
import { menuLoadCollectionRecipes } from 'actions/menuLoadCollectionRecipes'
import actionTypes from './actionTypes'

export const menuLoadCollections = (date, noUrlChange) => {
  return async (dispatch, getState) => {
    const state = getState()
    const accessToken = state.auth.get('accessToken')
    const isAuthenticated = state.auth.get('isAuthenticated')
    const experiments = (isAuthenticated) ? {
      experiments: {
        'justforyou_v2': true,
      },
    } : {}
    const args = {
      filters: {
        available_on: date,
      },
      ...experiments,
    }
    const { data: collections } = await fetchCollections(accessToken, '', args)
    const recommendationCollection = collections.find(collection => collection.slug === 'recommendations')
    if (recommendationCollection && recommendationCollection.properties) {
      const { tutorial } = recommendationCollection.properties
      // TODO [TR-432]: Feedback from James on branch #1151 - check new Jira ticket
      const tutorialEnabled = (tutorial && tutorial === 'jfy') || false

      dispatch(featureSet('jfyTutorial', tutorialEnabled))
    }

    // TODO: [TR-432]: Don't think we need this filterExperiment code anymore as we don't have this feature flag
    const filterExperiment = state.features.getIn(['dietaryQuickFilter', 'value'])
    const collectionsFiltered = filterExperiment ?
      collections.filter(collection => (!['dairy-free', 'gluten-free'].includes(collection.slug)))
      :
      collections
    dispatch(menuCollectionsReceive(collectionsFiltered))
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
}

export const menuLoadCollectionsRecipes = (date) => {
  return (dispatch, getState) => {
    const allRecipesCollections = getState().menuCollections.filter(isAllRecipes)
    const ids = Array.from(getState().menuCollections.keys())

    let allRecipesCollectionId
    if (allRecipesCollections.size > 0) {
      allRecipesCollectionId = allRecipesCollections.first().get('id')
    }

    return Promise.all(
      ids.map(id => menuLoadCollectionRecipes(date, id, id !== allRecipesCollectionId || !allRecipesCollectionId)(dispatch, getState))
    )
      .then(() => {
        const state = getState()
        const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
        dispatch({
          type: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: reachedLimit,
        })
      })
  }
}
