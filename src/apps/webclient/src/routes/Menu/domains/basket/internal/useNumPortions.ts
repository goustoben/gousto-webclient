import { useCallback } from 'react'

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import { basketNumPortionChange } from 'actions/basket'
import { getNumPortions } from 'selectors/basket'

export const useNumPortions = () => {
  const dispatch = useDispatch()
  const numPortions = useSelector<RootStateOrAny, number>(getNumPortions)

  const setNumPortions = useCallback(
    (newValue: number) => {
      dispatch(basketNumPortionChange(newValue))
    },
    [dispatch],
  )

  return { numPortions, setNumPortions }
}
