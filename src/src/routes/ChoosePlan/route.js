import React from 'react'
import { Redirect, Route } from 'react-router'
import routeConfig from 'config/routes'
import SignupLayout from 'layouts/SignupLayout'
import { isChoosePlanEnabled } from 'selectors/features'
import { ChoosePlanContainer } from './ChoosePlanContainer'

const onEnterHandler = (replace, next, store) => {
  if(!isChoosePlanEnabled(store.getState())) {
    const redirectTo = '/'
    replace(redirectTo)
  }

  next()
}

const route = store => (
  <Route component={SignupLayout}>
    <Route
      path={routeConfig.client.choosePlan}
      component={ChoosePlanContainer}
      onEnter={(routes, replace, next) => onEnterHandler(replace, next, store)}
    />
  </Route>
)

export default route
