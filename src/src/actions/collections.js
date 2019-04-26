import GoustoException from 'utils/GoustoException'
import * as collectionsApi from 'apis/collections'
import actionTypes from 'actions/actionTypes'
import statusActions from 'actions/status'
import { featureSet } from 'actions/features'

const collectionActions = {
  collectionsLoadCollectionBySlug,
  collectionsLoadCollectionRecipes,
  collectionsLoadCollections,
}

export function collectionsLoadCollections({ date, limit, offset, type } = {}) {
  return async (dispatch, getState) => {
    try {
      dispatch(statusActions.pending(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS, true))
      dispatch(statusActions.error(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS, null))
      const accessToken = getState().auth.get('accessToken')
      const isAuthenticated = getState().auth.get('isAuthenticated')
      const experiments = (isAuthenticated) ? {
        experiments: {
          'justforyou_v2': true,
        },
      } : {}
      let filters

      if (type) {
        filters = { type }
      }

      if (date) {
        filters = {
          ...filters,
          available_on: date,
        }
      }

      const args = {
        limit,
        filters,
        offset,
        ...experiments,
      }

      try {
        const { data: collections, meta } = await collectionsApi.fetchCollections(accessToken, '', args)
        dispatch({
          type: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
          collections,
        })
        if (meta && meta.properties && meta.properties.collection) {
          const { tutorial } = meta.properties.collection
          const tutorialEnabled = (tutorial && tutorial === 'jfy') || false

          dispatch(featureSet('jfyTutorial', tutorialEnabled))
        }
      } catch (err) {
        throw new GoustoException(`Failed to load collections with args: ${JSON.stringify(args)}`, {
          error: 'fetch-collections-fail',
          level: 'notice',
        })
      }
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS, false))
    }
  }
}

export function collectionsLoadCollectionBySlug(collectionSlug) {
  return async dispatch => {
    try {
      dispatch(statusActions.pending(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS, collectionSlug))
      dispatch(statusActions.error(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS, null))

      let collection
      try {
        const { data } = await collectionsApi.fetchCollectionBySlug(collectionSlug)
        collection = data
      } catch (err) {
        throw new GoustoException(`Failed to load collection by slug: ${collectionSlug}`, {
          error: 'fetch-collection-fail',
          level: 'notice',
        })
      }

      dispatch({
        type: actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS,
        collections: [collection],
      })
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.COLLECTIONS_RECIEVE_COLLECTIONS, false))
    }
  }
}

export function collectionsLoadCollectionRecipes(collectionId) {
  return async dispatch => {
    try {
      dispatch(statusActions.pending(actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES, true))
      dispatch(statusActions.error(actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES, null))

      let items
      try {
        const { data } = await collectionsApi.fetchCollectionRecipes(null, collectionId)
        items = data
      } catch (err) {
        throw new GoustoException(`Failed to load collection recipes by collection id: ${collectionId}`, {
          error: 'fetch-collection-recipes-fail',
          level: 'notice',
        })
      }

      dispatch({
        type: actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES,
        collectionId,
        recipes: items.recipes,
      })
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES, false))
    }
  }
}

export default collectionActions
