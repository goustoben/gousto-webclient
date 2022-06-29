import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'

import { orderDetails } from 'actions/orderConfirmation'
import config from 'config/routes'
import { useBasket } from 'routes/Menu/domains/basket'
import { checkValidSession } from 'utils/routes'

import { OrderConfirmationContainer } from './OrderConfirmationContainer'

const OrderConfirmationRoute = ({ store }) => {
  const { addRecipe } = useBasket()

  const onEnterHandler = React.useCallback(
    (routes, replace, next) => {
      const redirectTo = config.client.orderConfirmation
      const { getState, dispatch } = store

      const path = getState().routing.locationBeforeTransitions.pathname
      const orderId = path.split('/order-confirmation/')[1]
      if (typeof parseInt(orderId, 10) === 'number') {
        dispatch(orderDetails(orderId, addRecipe))
      }

      checkValidSession(store, redirectTo)(routes, replace, next)
    },
    [addRecipe, store],
  )

  return (
    <Route
      path={config.client.orderConfirmation}
      component={OrderConfirmationContainer}
      onEnter={onEnterHandler}
    />
  )
}

OrderConfirmationRoute.propTypes = {
  store: PropTypes.any.isRequired,
}

export { OrderConfirmationRoute }
