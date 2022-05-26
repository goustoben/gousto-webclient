import { renderHook } from '@testing-library/react-hooks'
import moment from 'moment'

import { useDeliveryDaysMap } from 'routes/Signup/Components/Calendar/hooks/useDeliveryDaysMap'
import { DeliveryDay } from 'routes/Signup/Components/Calendar/models/DeliveryDay'

describe('useDeliveryDaysMap hook', () => {
  test('should correctly map delivery days', () => {
    const dateFormat = 'YYYY-MM-DD'
    const today = moment().format(dateFormat)
    const actualDeliveryDay = {
      date: today,
      value: today,
      disabled: false,
      label: 'label',
    }
    const deliveryDays: DeliveryDay[] = [actualDeliveryDay]
    const deliveryDaysMap = renderHook(() => useDeliveryDaysMap(deliveryDays))
    expect(deliveryDaysMap.result.current.get(today)).toEqual(actualDeliveryDay)
  })
})
