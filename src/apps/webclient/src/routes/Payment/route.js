import React from 'react'

import { Route } from 'react-router'

import config from 'config/routes'

import { PaymentFailure } from './PaymentFailure'
import { PaymentSuccess } from './PaymentSuccess'

export const route = (
  <Route>
    <Route path={config.client.payment.success} component={PaymentSuccess} />
    <Route path={config.client.payment.failure} component={PaymentFailure} />
  </Route>
)
