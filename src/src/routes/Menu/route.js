import React from 'react'
import { Route } from 'react-router'
import { MenuContainer } from './MenuContainer'
import { ThematicsPage } from "routes/Menu/ThematicsPage/route"
import { MenuRecipesPage } from "routes/Menu/MenuRecipesPage/route"

export default (
  <Route component={MenuContainer}>
    <ThematicsPage/>
    <MenuRecipesPage/>
  </Route>
)
