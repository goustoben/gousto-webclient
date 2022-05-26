import React from 'react'

import { Route } from 'react-router'

import { orderDetails } from 'actions/orderConfirmation'
import config from 'config/routes'
import { checkValidSession } from 'utils/routes'

import { OrderConfirmationContainer } from './OrderConfirmationContainer'

const OrderConfirmationRoute = (store) => {
  const onEnterHandler = (routes, replace, next) => {
    const redirectTo = config.client.orderConfirmation
    const { getState, dispatch } = store

    const path = getState().routing.locationBeforeTransitions.pathname
    const orderId = path.split('/order-confirmation/')[1]
    if (typeof parseInt(orderId, 10) === 'number') {
      dispatch(orderDetails(orderId))
    }

    checkValidSession(store, redirectTo)(routes, replace, next)
  }

  return (
    <Route
      path={config.client.orderConfirmation}
      component={OrderConfirmationContainer}
      onEnter={onEnterHandler}
    />
  )
}

export { OrderConfirmationRoute }
