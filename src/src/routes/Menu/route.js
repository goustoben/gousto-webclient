import React from 'react'
import { Route } from 'react-router'
import MenuContainer from './MenuContainer'
import MainLayout from 'layouts/MainLayout'

export default (
  <Route component={MainLayout} withRecipeBar>
    <Route path="/menu(/:orderId)" component={MenuContainer} />
  </Route>
)
