import React from 'react'
import { Route } from 'react-router'
import configRoutes from 'config/routes'
import { FullPage } from 'layouts/FullPage'
import { UnsubscribeContainer } from './UnsubscribeContainer'

export const UnsubscribeRoute = (
  <Route component={FullPage} footerType="large">
    <Route path={configRoutes.client.unsubscribe} component={UnsubscribeContainer} />
  </Route>
)
