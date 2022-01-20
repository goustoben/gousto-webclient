import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'
import { RefundContainer } from './RefundContainer'

const Refund = (
  <Route path={configRoutes.client.getHelp.refund} component={RefundContainer} />
)

export {
  Refund
}
