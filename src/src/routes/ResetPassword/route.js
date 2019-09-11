import React from 'react'
import { Route } from 'react-router'
import configRoutes from 'config/routes'
import FullPage from 'layouts/FullPage'
import ResetPasswordContainer from './ResetPasswordContainer'

export default (
  <Route component={FullPage} footerType="large">
    <Route path={configRoutes.client.resetPassword} component={ResetPasswordContainer} />
  </Route>
)
