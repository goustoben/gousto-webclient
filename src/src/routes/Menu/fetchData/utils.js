import { getCollectionFreezeValue } from 'selectors/features'
import { hasJustForYouCollection } from 'selectors/collections'
import { recommendationsSlug } from 'config/collections'
import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { basketDateChange, basketSlotChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
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
  if (day_id) {
    const day = deliveryDays.find(deliveryDay => deliveryDay.get('coreDayId') === day_id)
    if(day) {
      const date = day.get('date')
      dispatch(basketDateChange(date))
      let slotIdToSet = ''
      if(slot_id) {
        const matchingSlot = day.get('slots').find(slot => slot.get('coreSlotId')=== slot_id)
        slotIdToSet = matchingSlot ? matchingSlot.get('id') : ''
      }
      dispatch(basketSlotChange(slotIdToSet))
    } else {
      dispatch(redirect('/menu', true))
    }
  } else {
    dispatch(redirect('/menu', true))
  }
}
