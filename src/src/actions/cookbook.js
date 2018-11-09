/* eslint no-use-before-define: ["error", { "functions": false }] */
import GoustoException from 'utils/GoustoException'
import * as collectionsApi from 'apis/collections'
import actionTypes from 'actions/actionTypes'
import statusActions from 'actions/status'

const cookbookActions = {
  cookbookLoadCollectionSets,
  cookbookLoadRecipeSets,
  cookbookLoadCollections,
  cookbookLoadCollectionRecipes,
  cookbookResetCollectionRecipes,
}

function cookbookLoadCollectionSets({ startSet, endSet }) {
  return {
    type: actionTypes.COOKBOOK_LOAD_COLLECTION_SETS,
    startSet,
    endSet,
  }
}

function cookbookLoadRecipeSets({ startSet, endSet }) {
  return {
    type: actionTypes.COOKBOOK_LOAD_RECIPE_SETS,
    startSet,
    endSet,
  }
}

function cookbookResetCollectionRecipes() {
  return {
    type: actionTypes.COOKBOOK_RESET_RECIPE_SETS,
  }
}

function cookbookLoadCollections({ limit, setNum = 1 } = {}) {
  return async (dispatch, getState) => {
    try {
      dispatch(statusActions.pending(actionTypes.COOKBOOK_RECIEVE_COLLECTIONS, setNum))
      dispatch(statusActions.error(actionTypes.COOKBOOK_RECIEVE_COLLECTIONS, null))
      const accessToken = getState().auth.get('accessToken')

      const args = {
        limit,
        filters: {
          type: 'cookbook',
        },
        offset: limit ? (setNum - 1) * limit : undefined,
      }

      try {
        const { data: collections, meta } = await collectionsApi.fetchCollections(accessToken, '', args)
        dispatch({
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTIONS,
          collections,
          meta,
          setNum,
        })
      } catch (err) {
        throw new GoustoException(`Failed to load collections with args ${JSON.stringify(args)}`, {
          error: 'fetch-collections-fail',
          level: 'notice',
        })
      }
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.COOKBOOK_RECIEVE_COLLECTIONS, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.COOKBOOK_RECIEVE_COLLECTIONS, false))
    }
  }
}

function cookbookLoadCollectionRecipes(collectionId, { limit, setNum = 1 } = {}) {
  return async dispatch => {
    try {
      dispatch(statusActions.pending(actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES, setNum))
      dispatch(statusActions.error(actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES, null))

      const args = {
        limit,
        filters: {
          type: 'cookbook',
          is_item_published: 1,
        },
        offset: limit ? (setNum - 1) * limit : undefined,
      }

      try {
        const { data, meta } = await collectionsApi.fetchCollectionRecipes(null, collectionId, args, false)

        dispatch({
          type: actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES,
          collectionId,
          meta: meta.recipes,
          recipes: data.recipes,
          setNum,
        })
      } catch (err) {
        throw new GoustoException(`Failed to load collection recipes for ${collectionId}`, {
          error: 'fetch-collection-recipes-fail',
          level: 'notice',
        })
      }
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES, false))
    }
  }
}

export default cookbookActions
