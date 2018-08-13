import React from 'react'
import { Route } from 'react-router'
import RateRecipesContainer from './RateRecipesContainer'
import config from 'config/routes'

export default (
	<Route path={config.client.rateMyRecipes} component={RateRecipesContainer} />
)
