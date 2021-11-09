import { GoustoException } from 'utils/GoustoException'
import * as collectionsApi from 'apis/collections'
import { actionTypes } from 'actions/actionTypes'
import statusActions from 'actions/status'

export function collectionsLoadCollectionBySlug(collectionSlug) {
  return async dispatch => {
    try {
      dispatch(statusActions.pending(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS, collectionSlug))
      dispatch(statusActions.error(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS, null))

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
        type: actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS,
        collections: [collection],
      })
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS, false))
    }
  }
}
