import { hasJustForYouCollection } from 'selectors/collections'
import { recommendationsSlug } from 'config/collections'
import { getCollectionIdWithName } from 'utils/collections'
import { getDefaultCollection } from '../selectors/collections'
import { basketDateChange } from "actions/basket/basketDateChange"
import { basketSlotChange } from "actions/basket/basketSlotChange"
import { collectionFilterIdReceive } from "actions/filters/collectionFilterIdReceive"
import { redirect } from "actions/redirect/redirect"

export const getPreselectedCollectionName = (state, collectionNameFromQueryParam) => {
  if (hasJustForYouCollection(state) && !collectionNameFromQueryParam) {
    return recommendationsSlug
  }

  return collectionNameFromQueryParam
}

export const selectCollection = (collectionName) => (dispatch, getState) => {
  const state = getState()
  let collectionId = getCollectionIdWithName(state, collectionName)

  if (!collectionId) {
    const defaultCollection = getDefaultCollection(state)

    if (defaultCollection) {
      collectionId = defaultCollection.get('id')
    }
  }

  dispatch(collectionFilterIdReceive(collectionId))
}

export const setSlotFromIds = (slot_id, day_id) => (dispatch, getState) => {
  const { boxSummaryDeliveryDays } = getState()
  if (day_id) {
    const day = boxSummaryDeliveryDays.find(deliveryDay => deliveryDay.get('coreDayId') === day_id)
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
