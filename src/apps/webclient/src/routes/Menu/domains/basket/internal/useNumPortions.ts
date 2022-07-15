import { useCallback } from 'react'

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

import { basketNumPortionChange } from 'actions/basket'
import { getNumPortions } from 'selectors/basket'

import { NumberOfPortions } from './types'

export const useNumPortions = () => {
  const dispatch = useDispatch()
  const numPortions = useSelector<RootStateOrAny, NumberOfPortions>(getNumPortions)

  const setNumPortions = useCallback(
    (newValue: NumberOfPortions) => {
      dispatch(basketNumPortionChange(newValue))
    },
    [dispatch],
  )

  return { numPortions, setNumPortions }
}
