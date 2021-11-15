import { Route } from "react-router"
import { MenuRecipesPageContainer } from "routes/Menu/MenuRecipesPage/MenuRecipesPageContainer"
import React from "react"

export const MenuRecipesPage = <Route path="/menu(/:orderId)" component={MenuRecipesPageContainer}/>
