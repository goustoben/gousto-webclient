import { useCalendarDays } from 'routes/Signup/Components/Calendar/hooks/useCalendarDays'
import { DeliveryDay } from 'routes/Signup/Components/Calendar/models/DeliveryDay'
import { renderHook } from '@testing-library/react-hooks'

describe('useCalendarDays hook', () => {
  test('should return correct amount of calendar days', () => {
    const weeks = 2
    const deliveryDays = [] as DeliveryDay[]
    const selectedDate = '2020-01-15'
    const calendarDays = renderHook(() => useCalendarDays(weeks, deliveryDays, selectedDate))
    const actualDaysAmount = calendarDays.result.current.length
    expect(actualDaysAmount).toEqual(weeks * 7)
  })
})
