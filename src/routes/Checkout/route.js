import React from 'react'
import { Route } from 'react-router'
import CheckoutLayout from 'layouts/CheckoutLayout'
import config from 'config/routes'
import { checkGuest } from 'utils/routes'
import CheckoutContainer from './CheckoutContainer'

const path = `${config.client['check-out']}(/:stepName)`

export default (store) => (
  <Route component={CheckoutLayout} onEnter={checkGuest(store, '/menu')}>
    <Route path={path} component={CheckoutContainer} />
  </Route>
)
