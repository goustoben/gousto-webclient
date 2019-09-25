import React from 'react'
import { Redirect, Route } from 'react-router'
import routeConfig from 'config/routes'
import SignupLayout from 'layouts/SignupLayout'
import { isChoosePlanEnabled } from 'selectors/features'
import { ChoosePlanContainer } from './ChoosePlanContainer'

const route = store => {
  if (isChoosePlanEnabled(store.getState())) {
    return (
      <Route component={SignupLayout}>
        <Route
          path={routeConfig.client.choosePlan}
          component={ChoosePlanContainer}
        />
      </Route>
    )
  }

  return <Redirect from="/choose-subscription-plan" to="/" />
}

export default route
