import React from 'react'
import { Route } from 'react-router'
import routeConfig from 'config/routes'
import SignupLayout from 'layouts/SignupLayout'
import { ChoosePlanContainer } from './ChoosePlanContainer'

export default (
  <Route component={SignupLayout}>
    <Route path={routeConfig.client.choosePlan} component={ChoosePlanContainer} />
  </Route>
)