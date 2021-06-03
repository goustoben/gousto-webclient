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
import { DeliveryValidationContainer } from './Delivery/DeliveryValidation'
import { DontKnowWhen } from './Delivery/DontKnowWhen'
import { EligibilityCheck } from './EligibilityCheck'
import { IngredientsContainer } from './Ingredients'
import { IngredientIssues } from './IngredientIssues'
import { IngredientReasons } from './IngredientReasons'
import { IngredientIssues as EligibilityCheckIngredientIssues } from './EligibilityCheck/IngredientIssues'
import { RecipeCards } from './RecipeCards'
import { Refund } from './Refund'
import { DidntArriveContainer } from './Delivery/DidntArrive'

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
    deliveryDidntArrive,
    deliveryDidntArriveValidation,
    deliveryDontKnowWhen,
    ingredients,
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
          path={delivery({userId: ':userId', orderId: ':orderId'})}
          component={DeliveryContainer}
        />
        <Route
          path={deliveryDidntArriveValidation({userId: ':userId', orderId: ':orderId'})}
          component={DeliveryValidationContainer}
        />
        <Route
          path={deliveryDontKnowWhen({userId: ':userId', orderId: ':orderId'})}
          component={DontKnowWhen}
        />
        <Route
          path={deliveryDidntArrive({userId: ':userId', orderId: ':orderId'})}
          component={DidntArriveContainer}
        />
        <Route
          path={ingredients({ userId: ':userId', orderId: ':orderId' })}
          component={IngredientsContainer}
        />
        {Confirmation}
        {Contact}
        {EligibilityCheck}
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
