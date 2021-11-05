import { useSelector } from 'react-redux'
import { getBasketMenuId } from 'selectors/basket'

export const useMenuId = () => useSelector(getBasketMenuId)
