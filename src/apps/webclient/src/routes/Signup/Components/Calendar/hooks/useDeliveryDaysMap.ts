import { useEffect, useState } from 'react'
import { DeliveryDay } from 'routes/Signup/Components/Calendar/models/DeliveryDay'

/**
 * Returns map of delivery day dates mapped to delivery day itself.
 */
export const useDeliveryDaysMap = (
  deliveryDays: Array<DeliveryDay>
): Map<DeliveryDay['date'], DeliveryDay> => {
  const [deliveryDaysMap, setDeliveryDaysMap] = useState(
    new Map<DeliveryDay['date'], DeliveryDay>()
  )
  useEffect(() => {
    const map = new Map()
    deliveryDays.forEach((day) => map.set(day.date, day))
    setDeliveryDaysMap(map)
  }, [deliveryDays])

  return deliveryDaysMap
}
