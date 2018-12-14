import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

import { IngredientReasonsContainer } from './IngredientReasonsContainer'

const IngredientReasons = (<Route
  path={configRoutes.client.getHelp.ingredientReasons}
  component={IngredientReasonsContainer}
/>)

export {
  IngredientReasons
}

