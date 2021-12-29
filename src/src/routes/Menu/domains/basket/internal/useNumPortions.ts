import { useDispatch, useSelector } from 'react-redux'
import { basketNumPortionChange } from 'actions/basket'
import { getNumPortions } from 'selectors/basket'

export const useNumPortions = () => {
  const dispatch = useDispatch()
  const numPortions = useSelector(getNumPortions)
  const setNumPortions = (newValue: number) => {
    dispatch(basketNumPortionChange(newValue))
  }

  return { numPortions, setNumPortions }
}
