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
import { DontKnowWhen } from './Delivery/DontKnowWhen'
import { EligibilityCheck } from './EligibilityCheck'
import { Ingredients } from './Ingredients'
import { IngredientIssues } from './IngredientIssues'
import { IngredientReasons } from './IngredientReasons'
import { IngredientIssues as EligibilityCheckIngredientIssues } from './EligibilityCheck/IngredientIssues'
import { RecipeCards } from './RecipeCards'
import { Refund } from './Refund'
import { DidntArrive } from './Delivery/DidntArrive'

const getHelpRoutes = (store) => {
  const onEnterHandler = (routes, replace, next) => {
    const redirectTo = '/'
    const isEligibilityCheckUrl = () => {
      const { pathname } = routes.location
      const { index, eligibilityCheck } = configRoutes.client.getHelp
      const eligibilityCheckUrl = `${index}/${eligibilityCheck}`

      return pathname.replace('/', '') === eligibilityCheckUrl.replace('/', '')
    }

    if (routes && routes.location && isEligibilityCheckUrl()) {
      return next()
    }

    // redirect user to the `/` in case auth session is not found
    return checkValidSession(store, redirectTo)(routes, replace, next)
  }

  const {
    index,
    delivery,
    didntArriveTemplate,
    dontKnowWhenTemplate
  } = configRoutes.client.getHelp
  const { login } = configRoutes.client

  return (
    <Route component={WizardLayout}>
      <Route
        path={index}
        component={GetHelpContainer}
        onEnter={onEnterHandler}
      >
        <IndexRoute component={OrderIssueContainer} />
        <Route
          path={delivery}
          component={DeliveryContainer}
        />
        <Route
          path={dontKnowWhenTemplate}
          component={DontKnowWhen}
        />
        <Route
          path={didntArriveTemplate}
          component={DidntArrive}
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
        <Redirect to={login} />
      </Route>
    </Route>
  )
}

export {
  getHelpRoutes
}
