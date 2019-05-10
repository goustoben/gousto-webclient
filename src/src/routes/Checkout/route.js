import React from 'react'
import { Route } from 'react-router'
import CheckoutContainer from './CheckoutContainer'
import CheckoutLayout from 'layouts/CheckoutLayout'
import config from 'config/routes'
import { checkGuest } from 'utils/routes'

const path = `${config.client['check-out']}(/:stepName)`

export default (store) => (
  <Route component={CheckoutLayout} onEnter={checkGuest(store, '/menu')}>
    <Route path={path} component={CheckoutContainer} />
  </Route>
)
