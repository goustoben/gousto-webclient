import React from 'react'
import { Redirect, Route } from 'react-router'

import configRoutes from 'config/routes'
import WizardLayout from 'layouts/WizardLayout'
import { checkValidSession } from 'utils/routes'
import { GetHelpContainer } from './GetHelpContainer'
import { Contact } from './Contact'
import { Confirmation } from './Confirmation'
import { IngredientIssues } from './IngredientIssues'
import { IngredientReasons } from './IngredientReasons'
import { Refund } from './Refund'
import { OrderIssue } from "routes/GetHelp/OrderIssue/route"
import { AutoAcceptCheck } from "routes/GetHelp/AutoAcceptCheck/route"
import { AutoAcceptConfirmation } from "routes/GetHelp/AutoAcceptConfirmation/route"
import { Delivery } from "routes/GetHelp/Delivery/route"
import { DeliveryValidation } from "routes/GetHelp/Delivery/DeliveryValidation/route"
import { DidntArrive } from "routes/GetHelp/Delivery/DidntArrive/route"
import { DontKnowWhen } from "routes/GetHelp/Delivery/DontKnowWhen/route"
import { Ingredients } from "routes/GetHelp/Ingredients/route"
import { IneligibleIngredients } from "routes/GetHelp/IneligibleIngredients/route"
import { RecipeCards } from "routes/GetHelp/RecipeCards/route"
import { IneligibleIngredientsSameDay } from "routes/GetHelp/IneligibleIngredientsSameDay/route"

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
        <OrderIssue/>
        <AutoAcceptCheck autoAcceptCheck={autoAcceptCheck}/>
        <AutoAcceptConfirmation autoAcceptConfirmation={autoAcceptConfirmation}/>
        <Delivery delivery={delivery}/>
        <DeliveryValidation deliveryDidntArriveValidation={deliveryDidntArriveValidation}/>
        <DontKnowWhen deliveryDontKnowWhen={deliveryDontKnowWhen}/>
        <DidntArrive deliveryDidntArrive={deliveryDidntArrive}/>
        <Ingredients ingredients={ingredients}/>
        <IneligibleIngredients multipleIngredientsIssues={multipleIngredientsIssues}/>
        <RecipeCards recipeCards={recipeCards}/>
        <IneligibleIngredientsSameDay sameDayIngredientIssues={sameDayIngredientIssues}/>
        {Confirmation}
        {Contact}
        {IngredientIssues}
        {IngredientReasons}
        {Refund}
        <Redirect to={login}/>
      </Route>
    </Route>
  )
}

export {
  getHelpRoutes
}
