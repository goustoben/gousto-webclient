import { useSelector } from 'react-redux'

import { getBasketOrderId } from 'selectors/basket'

export const useOrderId = () => useSelector(getBasketOrderId)
