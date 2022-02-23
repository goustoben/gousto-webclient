import { useMemo } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { basketDateChange, basketSlotChange } from 'actions/basket'
import { getBasketDate, getBasketSlotId } from 'selectors/basket'

const useCurrentDate = () => useSelector<RootStateOrAny, string>(getBasketDate)
const useCurrentSlotId = () => useSelector<RootStateOrAny, string>(getBasketSlotId)

const useChangeFunctions = () => {
  const dispatch = useDispatch()

  const changeDate = useMemo(() => (date: string) => dispatch(basketDateChange(date)), [dispatch])

  const changeSlot = useMemo(
    () => (slotId: string) => dispatch(basketSlotChange(slotId)),
    [dispatch]
  )

  return { changeDate, changeSlot }
}

/**
 * Hook to handle the currently selected basket date and slot.
 *
 * Returns
 *  the currently selected date,
 *  and a function to change the currently selected date.
 *
 *  the currently selected slot,
 *  and a function to change the currently selected slot.
 */
export const useDate = () => {
  const date = useCurrentDate()
  const slotId = useCurrentSlotId()
  const { changeDate, changeSlot } = useChangeFunctions()

  return {
    date,
    changeDate,
    slotId,
    changeSlot,
  }
}
