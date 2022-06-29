import React from 'react'

import { Route } from 'react-router'

import config from 'config/routes'
import { checkValidSession } from 'utils/routes'

import { OrderConfirmationWrapper } from './OrderConfirmationWrapper'

const OrderConfirmationRoute = (store) => {
  const onEnterHandler = (routes, replace, next) => {
    const redirectTo = config.client.orderConfirmation

    checkValidSession(store, redirectTo)(routes, replace, next)
  }

  return (
    <Route
      path={config.client.orderConfirmation}
      component={OrderConfirmationWrapper}
      onEnter={onEnterHandler}
    />
  )
}

export { OrderConfirmationRoute }
