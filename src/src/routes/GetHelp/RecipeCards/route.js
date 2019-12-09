import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

import { RecipeCardsContainer } from './RecipeCardsContainer'

const RecipeCards = (
  <Route
    path={configRoutes.client.getHelp.recipeCards}
    component={RecipeCardsContainer}
  />
)

export {
  RecipeCards
}

