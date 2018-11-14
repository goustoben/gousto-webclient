import { getCollectionFreezeValue, isJustForYouFeatureEnabled } from 'selectors/features'
import { recommendationsShortTitle } from 'config/collections'
import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { collectionFilterIdRecieve } from 'actions/filters'

export const getPreselectedCollectionName = (state, collectionNameFromQueryParam) => {
  const featureCollectionFreeze = getCollectionFreezeValue(state)

  if (typeof featureCollectionFreeze === 'string' && featureCollectionFreeze.length > 0) {
    return featureCollectionFreeze
  } else if (isJustForYouFeatureEnabled(state) && !collectionNameFromQueryParam) {
    return recommendationsShortTitle
  }

  return collectionNameFromQueryParam
}

export const selectCollection = (state, collectionName, dispatch) => {
  let collectionId = getCollectionIdWithName(state, collectionName)
  if (!collectionId) {
    collectionId = getDefaultCollectionId(state)
  }

  dispatch(collectionFilterIdRecieve(collectionId))
}
