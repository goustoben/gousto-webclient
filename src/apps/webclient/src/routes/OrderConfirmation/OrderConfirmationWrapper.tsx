import * as React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { orderDetails } from 'actions/orderConfirmation'
import { useBasket } from 'routes/Menu/domains/basket'

import { OrderConfirmationContainer } from './OrderConfirmationContainer'

function useOrderId() {
  const path = useSelector((state: any) => state.routing?.locationBeforeTransitions?.pathname)

  if (!path) {
    return null
  }

  const orderId = path.split('/order-confirmation/')[1]

  const parsed = parseInt(orderId, 10)

  if (Number.isNaN(parsed)) {
    return null
  }

  return parsed
}

export function OrderConfirmationWrapper() {
  const orderId = useOrderId()
  const dispatch = useDispatch()
  const { addRecipe } = useBasket()
  const [lastLoadedOrderId, setLastLoadedOrderId] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (!orderId || lastLoadedOrderId === orderId) {
      return
    }

    setLastLoadedOrderId(orderId)
    dispatch(orderDetails(orderId, addRecipe))
  }, [dispatch, addRecipe, lastLoadedOrderId, orderId])

  return <OrderConfirmationContainer />
}
