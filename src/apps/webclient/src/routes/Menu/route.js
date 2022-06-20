import React from 'react'

import { Route } from 'react-router'

import { MenuContainer } from './MenuContainer'
import { MenuRecipesPageWrapper } from './MenuRecipesPage'

export const MenuRoute = (
  <Route component={MenuContainer}>
    <Route path="/menu(/:orderId)" component={MenuRecipesPageWrapper} />
  </Route>
)
