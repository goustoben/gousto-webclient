import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import { checkValidSession } from 'utils/routes'

import OrderConfirmation from './OrderConfirmationContainer'
import { orderDetails } from "actions/order/orderDetails"
import MainLayout from "layouts/MainLayout"

export default (store) => {
  const onEnterHandler = (routes, replace, next) => {
    const redirectTo = config.client.orderConfirmation
    const path = store.getState().routing.locationBeforeTransitions.pathname
    const orderId = path.split('/order-confirmation/')[1]
    if (typeof parseInt(orderId) === 'number') {
      store.dispatch(orderDetails(orderId))
    }

    checkValidSession(store, redirectTo)(routes, replace, next)
  }

  return (
    <Route component={MainLayout}>
      <Route path={config.client.orderConfirmation} component={OrderConfirmation} onEnter={onEnterHandler}/>
    </Route>
  )
}
