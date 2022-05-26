import { basketDateChange, basketSlotChange } from 'actions/basket'
import { collectionFilterIdReceive } from 'actions/filters'
import { redirect } from 'actions/redirect'
import { recommendationsSlug } from 'config/collections'
import { hasJustForYouCollection } from 'selectors/collections'
import { getCollectionIdWithName } from 'utils/collections'

import { getDefaultCollection } from '../selectors/collections'

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

export const setSlotFromIds = (slotId, dayId) => (dispatch, getState) => {
  const { boxSummaryDeliveryDays } = getState()
  if (dayId) {
    const day = boxSummaryDeliveryDays.find((deliveryDay) => deliveryDay.get('coreDayId') === dayId)
    if (day) {
      const date = day.get('date')
      dispatch(basketDateChange(date))
      let slotIdToSet = ''
      if (slotId) {
        const matchingSlot = day.get('slots').find((slot) => slot.get('coreSlotId') === slotId)
        slotIdToSet = matchingSlot ? matchingSlot.get('id') : ''
      }
      dispatch(basketSlotChange(slotIdToSet))
    } else {
      dispatch(redirect('/menu'))
    }
  }
}
