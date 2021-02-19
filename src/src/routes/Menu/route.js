import React from 'react'
import { Route } from 'react-router'
import { MenuContainer } from './MenuContainer'
import { ThematicsPageContainer } from './ThematicsPage'
import { MenuRecipesPageContainer } from './MenuRecipesPage'
import { DietaryRequirementsPageContainer } from './DietaryRequirementsPage'
export default (
  <Route component={MenuContainer}>
    <Route path="/menu/thematic/:slug" component={ThematicsPageContainer} />
    <Route path="/menu/dietary-requirements" component={DietaryRequirementsPageContainer} />
    <Route path="/menu(/:orderId)" component={MenuRecipesPageContainer} />
  </Route>
)
