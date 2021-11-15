import { Route } from "react-router"
import { RecipeCardsContainer } from "routes/GetHelp/RecipeCards/RecipeCardsContainer"
import React from "react"

export const RecipeCards = props => {
    let {recipeCards} = props
    return <Route
        path={recipeCards({userId: ':userId', orderId: ':orderId'})}
        component={RecipeCardsContainer}
    />
}
