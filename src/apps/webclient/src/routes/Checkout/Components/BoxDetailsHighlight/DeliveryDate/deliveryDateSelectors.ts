import { createSelector } from 'reselect'

import { StateTypePlaceholder } from '../types'

export const getDeliveryDateData = ({ boxSummaryDeliveryDays, basket }: StateTypePlaceholder) => ({
  deliveryDays: boxSummaryDeliveryDays,
  slotId: basket.get('slotId'),
  date: basket.get('date'),
})
export const getDeliveryDateDataSelector = createSelector(
  getDeliveryDateData,
  ({ deliveryDays, slotId, date }) => ({ deliveryDays, slotId, date }),
)
