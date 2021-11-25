import React from 'react'
import { Route } from 'react-router'
import { MenuContainer } from './MenuContainer'
import { MenuRecipesPageWrapper } from './MenuRecipesPage'
export default (
  <Route component={MenuContainer}>
    <Route path="/menu(/:orderId)" component={MenuRecipesPageWrapper} />
  </Route>
)
