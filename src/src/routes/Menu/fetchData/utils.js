import { getCollectionFreezeValue } from 'selectors/features'
import { hasJustForYouCollection } from 'selectors/collections'
import { recommendationsSlug } from 'config/collections'
import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import actions from 'actions'
import { collectionFilterIdRecieve } from 'actions/filters'

export const getPreselectedCollectionName = (state, collectionNameFromQueryParam) => {
  const featureCollectionFreeze = getCollectionFreezeValue(state)

  if (typeof featureCollectionFreeze === 'string' && featureCollectionFreeze.length > 0) {
    return featureCollectionFreeze
  } else if (hasJustForYouCollection(state) && !collectionNameFromQueryParam) {
    return recommendationsSlug
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

export const setSlotFromIds = (state, slot_id, day_id, dispatch) => {
  const deliveryDays = state.boxSummaryDeliveryDays
  if (slot_id) {
    const day = deliveryDays.find(deliveryDay =>
      deliveryDay.get('slots').some(slot => slot.get('id')=== slot_id)
    )
    const date = day.get('date')
    dispatch(actions.basketDateChange(date))
    dispatch(actions.basketSlotChange(slot_id))
  } else if (day_id) {
    const day = deliveryDays.find(deliveryDay => deliveryDay.get('id') === day_id)
    const date = day.get('date')
    dispatch(actions.basketDateChange(date))
    if(!slot_id) {
      dispatch(actions.basketSlotChange(''))
    }
  }
}
