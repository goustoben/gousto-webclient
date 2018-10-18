import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

import { IngredientsContainer } from './IngredientsContainer'

const Ingredients = (<Route
	path={configRoutes.client.getHelp.ingredients}
	component={IngredientsContainer}
/>)

export {
	Ingredients
}

