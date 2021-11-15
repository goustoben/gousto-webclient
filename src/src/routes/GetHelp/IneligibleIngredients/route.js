import { Route } from "react-router"
import { IneligibleIngredientsContainer } from "routes/GetHelp/IneligibleIngredients/IneligibleIngredientsContainer"
import React from "react"

export const IneligibleIngredients = props => {
    let {multipleIngredientsIssues} = props
    return <Route
        path={multipleIngredientsIssues}
        component={IneligibleIngredientsContainer}
    />
}
