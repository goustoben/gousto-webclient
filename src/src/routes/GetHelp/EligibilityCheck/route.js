import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

import { EligibilityCheckContainer } from './EligibilityCheckContainer'

const EligibilityCheck = (
  <Route
    path={configRoutes.client.getHelp.eligibilityCheck}
    component={EligibilityCheckContainer}
  />
)

export {
  EligibilityCheck
}
