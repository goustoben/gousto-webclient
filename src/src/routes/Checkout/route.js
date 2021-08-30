import React from 'react'
import { Route } from 'react-router'
import { CheckoutLayout } from 'layouts/CheckoutLayout'
import config from 'config/routes'
import { checkGuest } from 'utils/routes'
import { CheckoutContainer } from './CheckoutContainer'
import { WelcomeToGoustoContainer } from './Components/WelcomeToGousto'

const path = `${config.client['check-out']}(/:stepName)`
const checkoutWelcome = `${config.client['check-out']}/welcome-to-gousto/:orderId`

export const Checkout = (store) => (
  <Route component={CheckoutLayout} onEnter={checkGuest(store, '/menu')}>
    <Route path={path} component={CheckoutContainer} />
    <Route path={checkoutWelcome} component={WelcomeToGoustoContainer} />
  </Route>
)
