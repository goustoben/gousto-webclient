import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

import configRoutes from 'config/routes'
import WizardLayout from 'layouts/WizardLayout'
import { checkValidSession } from 'utils/routes'
import { AutoAcceptCheckContainer } from './AutoAcceptCheck'
import { AutoAcceptConfirmationContainer } from './AutoAcceptConfirmation'
import { GetHelpContainer } from './GetHelpContainer'
import { OrderIssueContainer } from './OrderIssue/OrderIssueContainer'
import { Contact } from './Contact'
import { Confirmation } from './Confirmation'
import { IneligibleIngredientsContainer } from './IneligibleIngredients'
import { IneligibleIngredientsSameDayContainer } from './IneligibleIngredientsSameDay'
import { DeliveryContainer } from './Delivery'
import { DeliveryValidationContainer } from './Delivery/DeliveryValidation'
import { DontKnowWhen } from './Delivery/DontKnowWhen'
import { IngredientsContainer } from './Ingredients'
import { IngredientIssues } from './IngredientIssues'
import { IngredientReasons } from './IngredientReasons'
import { RecipeCardsContainer } from './RecipeCards'
import { RecipeCardConfirmationContainer } from './RecipeCards/RecipeCardConfirmation'
import { RecipeCardsSelectContainer } from './RecipeCards/RecipeCardsSelect'
import { RecipeCardIssuesContainer} from './RecipeCards/RecipeCardIssues'
import { RepetitiveIngredientsIssuesContainer } from './RepetitiveIngredientsIssues'
import { Refund } from './Refund'
import { DidntArriveContainer } from './Delivery/DidntArrive'

const getHelpRoutes = (store) => {
  const {
    index,
    autoAcceptCheck,
    autoAcceptConfirmation,
    contact,
    delivery,
    deliveryDidntArrive,
    deliveryDidntArriveValidation,
    deliveryDontKnowWhen,
    ingredients,
    multipleIngredientsIssues,
    recipeCards,
    recipeCardsConfirmation,
    recipeCardsSelect,
    recipeCardsIssues,
    repetitiveIngredientsIssues,
    sameDayIngredientIssues
  } = configRoutes.client.getHelp

  const allowNotLoggedInToSomeRoutes = (routes, next) => {
    if (routes.location.pathname === `${index}/${contact}`) {
      next()
    }
  }

  const onEnterHandler = (routes, replace, next) => {
    const redirectTo = '/'
    allowNotLoggedInToSomeRoutes(routes, next)
    // redirect user to the `/` in case auth session is not found

    return checkValidSession(store, redirectTo)(routes, replace, next)
  }

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
          path={autoAcceptCheck}
          component={AutoAcceptCheckContainer}
        />
        <Route
          path={autoAcceptConfirmation}
          component={AutoAcceptConfirmationContainer}
        />
        <Route
          path={delivery({ userId: ':userId', orderId: ':orderId' })}
          component={DeliveryContainer}
        />
        <Route
          path={deliveryDidntArriveValidation({ userId: ':userId', orderId: ':orderId' })}
          component={DeliveryValidationContainer}
        />
        <Route
          path={deliveryDontKnowWhen({ userId: ':userId', orderId: ':orderId' })}
          component={DontKnowWhen}
        />
        <Route
          path={deliveryDidntArrive({ userId: ':userId', orderId: ':orderId' })}
          component={DidntArriveContainer}
        />
        <Route
          path={ingredients({ userId: ':userId', orderId: ':orderId' })}
          component={IngredientsContainer}
        />
        <Route
          path={multipleIngredientsIssues}
          component={IneligibleIngredientsContainer}
        />
        <Route
          path={recipeCards({ userId: ':userId', orderId: ':orderId' })}
          component={RecipeCardsContainer}
        />
        <Route
          path={`${recipeCardsSelect({ userId: ':userId', orderId: ':orderId' })}`}
          component={RecipeCardsSelectContainer}
        />
        <Route
          path={`${recipeCardsConfirmation({ userId: ':userId', orderId: ':orderId' })}`}
          component={RecipeCardConfirmationContainer}
        />
        <Route
          path={`${recipeCardsIssues({ userId: ':userId', orderId: ':orderId' })}`}
          component={RecipeCardIssuesContainer}
        />
        <Route
          path={repetitiveIngredientsIssues({ userId: ':userId', orderId: ':orderId' })}
          component={RepetitiveIngredientsIssuesContainer}
        />
        <Route
          path={sameDayIngredientIssues}
          component={IneligibleIngredientsSameDayContainer}
        />
        {Confirmation}
        {Contact}
        {IngredientIssues}
        {IngredientReasons}
        {Refund}
        <Redirect to={login} />
      </Route>
    </Route>
  )
}

export {
  getHelpRoutes
}
