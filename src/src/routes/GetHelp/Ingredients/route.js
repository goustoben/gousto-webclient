import { Route } from "react-router"
import { IngredientsContainer } from "routes/GetHelp/Ingredients/IngredientsContainer"
import React from "react"

export const Ingredients = ({ingredients}) => {
    return <Route
        path={ingredients({userId: ':userId', orderId: ':orderId'})}
        component={IngredientsContainer}
    />
}
