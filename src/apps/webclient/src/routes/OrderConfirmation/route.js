import React from 'react'

import { Route } from 'react-router'

import { client } from 'config/routes'
import { checkValidSession } from 'utils/routes'

import { OrderConfirmationWrapper } from './OrderConfirmationWrapper'

const OrderConfirmationRoute = (store) => {
  const { orderConfirmation, home } = client

  return (
    <Route
      path={orderConfirmation}
      component={OrderConfirmationWrapper}
      onEnter={checkValidSession(store, home, true)}
    />
  )
}

export { OrderConfirmationRoute }
