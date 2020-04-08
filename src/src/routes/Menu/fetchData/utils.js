import { hasJustForYouCollection } from 'selectors/collections'
import { recommendationsSlug } from 'config/collections'
import { getCollectionIdWithName } from 'utils/collections'
import { basketDateChange, basketSlotChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { collectionFilterIdReceive } from 'actions/filters'
import { getDefaultCollection } from '../selectors/collections'

export const getPreselectedCollectionName = (state, collectionNameFromQueryParam) => {
  if (hasJustForYouCollection(state) && !collectionNameFromQueryParam) {
    return recommendationsSlug
  }

  return collectionNameFromQueryParam
}

export const selectCollection = (state, collectionName, dispatch) => {
  let collectionId = getCollectionIdWithName(state, collectionName)

  if (!collectionId) {
    const defaultCollection = getDefaultCollection(state)

    if (defaultCollection) {
      collectionId = defaultCollection.get('id')
    }
  }

  dispatch(collectionFilterIdReceive(collectionId))
}

export const setSlotFromIds = (state, slot_id, day_id, dispatch) => {
  const deliveryDays = state.boxSummaryDeliveryDays
  if (day_id) {
    const day = deliveryDays.find(deliveryDay => deliveryDay.get('coreDayId') === day_id)
    if (day) {
      const date = day.get('date')
      dispatch(basketDateChange(date))
      let slotIdToSet = ''
      if (slot_id) {
        const matchingSlot = day.get('slots').find(slot => slot.get('coreSlotId') === slot_id)
        slotIdToSet = matchingSlot ? matchingSlot.get('id') : ''
      }
      dispatch(basketSlotChange(slotIdToSet))
    } else {
      dispatch(redirect('/menu'))
    }
  }
}
