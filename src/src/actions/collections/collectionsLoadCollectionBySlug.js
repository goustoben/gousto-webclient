import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import GoustoException from "utils/GoustoException"
import { errorLoad } from "actions/status/errorLoad"
import { fetchCollectionBySlug } from "apis/collections/fetchCollectionBySlug"

export function collectionsLoadCollectionBySlug(collectionSlug) {
    return async dispatch => {
        try {
            dispatch(pending(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS, collectionSlug))
            dispatch(error(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS, null))

            let collection
            try {
                const {data} = await fetchCollectionBySlug(collectionSlug)
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
            dispatch(errorLoad(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS, err))
        } finally {
            dispatch(pending(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS, false))
        }
    }
}
