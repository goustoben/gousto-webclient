import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import { checkValidSession } from 'utils/routes'
import { orderDetails } from 'actions/orderConfirmation'

import OrderConfirmation from './OrderConfirmationContainer'

export default (store) => {
  const onEnterHandler = (routes, replace, next) => {
    const redirectTo = config.client.orderConfirmation
    const path = store.getState().routing.locationBeforeTransitions.pathname
    const orderId = path.split('/order-confirmation/')[1]
    if(typeof parseInt(orderId) === 'number') {
      store.dispatch(orderDetails(orderId))
    }

    checkValidSession(store, redirectTo)(routes, replace, next)
  }

  return (
    <Route path={config.client.orderConfirmation} component={OrderConfirmation} onEnter={onEnterHandler} />
  )
}
