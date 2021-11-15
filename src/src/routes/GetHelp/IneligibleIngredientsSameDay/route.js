import { Route } from "react-router"
import { IneligibleIngredientsSameDayContainer } from "routes/GetHelp/IneligibleIngredientsSameDay/IneligibleIngredientsSameDayContainer"
import React from "react"

export const IneligibleIngredientsSameDay = props => {
    let {sameDayIngredientIssues} = props
    return <Route
        path={sameDayIngredientIssues}
        component={IneligibleIngredientsSameDayContainer}
    />
}
