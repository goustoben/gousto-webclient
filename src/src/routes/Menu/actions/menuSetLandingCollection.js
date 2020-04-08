import { collectionFilterChange } from 'actions/filters'
import { getCollectionIdWithName } from 'utils/collections'
import { getDefaultCollection } from '../selectors/collections'

export const menuSetLandingCollection = () =>
  (dispatch, getState) => {
    let changeCollection = true
    const prevLoc = getState().routing.locationBeforeTransitions

    if (prevLoc && prevLoc.query && prevLoc.query.collection) {
      if (getCollectionIdWithName(getState(), prevLoc.query.collection)) {
        changeCollection = false
      }
    }

    if (changeCollection) {
      const landingCollection = getDefaultCollection(getState())

      if (landingCollection) {
        dispatch(collectionFilterChange(landingCollection.get('id')))
      }
    }
  }
