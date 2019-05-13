import React from 'react'
import { Route } from 'react-router'
import ResetPasswordContainer from './ResetPasswordContainer'
import configRoutes from 'config/routes'
import FullPage from 'layouts/FullPage'

export default (
  <Route component={FullPage} footerType="large">
    <Route path={configRoutes.client.resetPassword} component={ResetPasswordContainer} />
  </Route>
)
