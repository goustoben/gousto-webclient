import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

import { IngredientIssuesContainer } from './IngredientIssuesContainer'

const IngredientIssues = (<Route
  path={configRoutes.client.getHelp.ingredientIssues}
  component={IngredientIssuesContainer}
/>)

export {
  IngredientIssues
}

