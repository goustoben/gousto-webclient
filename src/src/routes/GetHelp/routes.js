import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

import configRoutes from 'config/routes'
import WizardLayout from 'layouts/WizardLayout'
import { checkValidSession } from 'utils/routes'
import { GetHelpContainer } from './GetHelpContainer'
import { OrderIssueContainer } from './OrderIssue/OrderIssueContainer'

import { Contact } from './Contact'
import { Confirmation } from './Confirmation'
import { Delivery } from './Delivery'
import { EligibilityCheck } from './EligibilityCheck'
import { Ingredients } from './Ingredients'
import { IngredientIssues } from './IngredientIssues'
import { IngredientReasons } from './IngredientReasons'
import { RecipeCards } from './RecipeCards'
import { Refund } from './Refund'

const getHelpRoutes = (store) => {
  const onEnterHandler = (routes, replace, next) => {
    const redirectTo = '/'

    // redirect user to the `/` in case auth session is not found
    checkValidSession(store, redirectTo)(routes, replace, next)
  }

  return (
    <Route component={WizardLayout}>
      <Route
        path={configRoutes.client.getHelp.index}
        component={GetHelpContainer}
        onEnter={onEnterHandler}
      >
        <IndexRoute component={OrderIssueContainer} />
        {Confirmation}
        {Contact}
        {Delivery}
        {EligibilityCheck}
        {Ingredients}
        {IngredientIssues}
        {IngredientReasons}
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

