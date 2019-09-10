import React from 'react'
import { Route } from 'react-router'
import MainLayout from 'layouts/MainLayout'
import MenuContainer from './MenuContainer'

export default (
  <Route component={MainLayout} withRecipeBar>
    <Route path="/menu(/:orderId)" component={MenuContainer} />
  </Route>
)
