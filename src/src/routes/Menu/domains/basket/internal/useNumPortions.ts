import { useSelector } from 'react-redux'
import { getNumPortions } from 'selectors/basket'

export const useNumPortions = () => useSelector(getNumPortions)
