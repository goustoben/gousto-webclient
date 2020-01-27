import React from 'react'
import { Route } from 'react-router'
import { MenuContainer } from './MenuContainer'
import { FoodBrandPageContainer } from './FoodBrandPage'
import { ThematicsPageContainer } from './ThematicsPage'
import { MenuRecipesPageContainer } from './MenuRecipesPage'

export default (
  <Route component={MenuContainer}>
    <Route path="/menu/food-brand/:slug" component={FoodBrandPageContainer} />
    <Route path="/menu/thematic/:slug" component={ThematicsPageContainer} />
    <Route path="/menu(/:orderId)" component={MenuRecipesPageContainer} />
  </Route>
)
