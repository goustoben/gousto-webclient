import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

import configRoutes from 'config/routes'
import WizardLayout from 'layouts/WizardLayout'
import { checkValidSession } from 'utils/routes'
import { GetHelpContainer } from './GetHelpContainer'
import { OrderIssueContainer } from './OrderIssue/OrderIssueContainer'

import { Contact } from './Contact'
import { Confirmation } from './Confirmation'
import { DeliveryContainer } from './Delivery'
import { EligibilityCheck } from './EligibilityCheck'
import { Ingredients } from './Ingredients'
import { IngredientIssues } from './IngredientIssues'
import { IngredientReasons } from './IngredientReasons'
import { IngredientIssues as EligibilityCheckIngredientIssues } from './EligibilityCheck/IngredientIssues'
import { RecipeCards } from './RecipeCards'
import { Refund } from './Refund'

const getHelpRoutes = (store) => {
  const onEnterHandler = (routes, replace, next) => {
    const redirectTo = '/'
    const isEligibilityCheckUrl = () => {
      const { location } = routes
      const { getHelp } = configRoutes.client
      const eligibilityCheckUrl = `${getHelp.index}/${getHelp.eligibilityCheck}`

      return location.pathname.replace('/', '') === eligibilityCheckUrl.replace('/', '')
    }

    if (routes && routes.location && isEligibilityCheckUrl()) {
      return next()
    }

    // redirect user to the `/` in case auth session is not found
    return checkValidSession(store, redirectTo)(routes, replace, next)
  }

  return (
    <Route component={WizardLayout}>
      <Route
        path={configRoutes.client.getHelp.index}
        component={GetHelpContainer}
        onEnter={onEnterHandler}
      >
        <IndexRoute component={OrderIssueContainer} />
        <Route
          path={configRoutes.client.getHelp.delivery}
          component={DeliveryContainer}
        />
        {Confirmation}
        {Contact}
        {EligibilityCheck}
        {Ingredients}
        {IngredientIssues}
        {IngredientReasons}
        {EligibilityCheckIngredientIssues}
        {RecipeCards}
        {Refund}
        <Redirect to={configRoutes.client.login} />
      </Route>
    </Route>
  )
}

export {
  getHelpRoutes
}
