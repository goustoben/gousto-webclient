import { getCollectionIdWithName } from 'utils/collections'
import { getDefaultCollection } from '../../selectors/collections'
import { collectionFilterChange } from "actions/filters/collectionFilterChange"

const getPathName = (state) => state.routing.locationBeforeTransitions.pathName
const isOnMenu = (pathName) => pathName && (pathName === '/menu' || pathName.startsWith('/menu/'))
const getCollectionQuery = (state) => {
  const location = state.routing.locationBeforeTransitions

  if (!location || !location.query || !location.query.collection) {
    return null
  }

  return location.query.collection
}

export const menuSetLandingCollection = () =>
  (dispatch, getState) => {
    const pathName = getPathName(getState())

    if (!isOnMenu(pathName)) {
      return
    }

    const collectionSlug = getCollectionQuery(getState())

    // if collection already set and it's valid then don't set again
    if (collectionSlug && getCollectionIdWithName(getState(), collectionSlug)) {
      return
    }

    const landingCollection = getDefaultCollection(getState())

    if (!landingCollection) {
      return
    }

    dispatch(collectionFilterChange(landingCollection.get('id')))
  }
