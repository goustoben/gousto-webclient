import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import RateRecipesContainer from './RateRecipesContainer'

export default (
  <Route path={config.client.rateMyRecipes} component={RateRecipesContainer} />
)
