import moment from 'moment'
import { useSelector } from 'react-redux'

import { getSlotTimes } from 'utils/deliveries'

import { getDeliveryDateDataSelector } from '../boxDetailsHighlightSelectors'

export const useGetDeliveryData = () => {
  const { deliveryDays, slotId, date } = useSelector(getDeliveryDateDataSelector)
  const formattedDate = moment(date).format('dddd Do MMM')
  const formattedSlots = getSlotTimes({ date, deliveryDays, slotId })

  return { formattedDate, formattedSlots }
}
