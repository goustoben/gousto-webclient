import { Route } from "react-router"
import { AutoAcceptConfirmationContainer } from "routes/GetHelp/AutoAcceptConfirmation/AutoAcceptConfirmationContainer"
import React from "react"

export const AutoAcceptConfirmation = ({autoAcceptConfirmation}) => <Route
    path={autoAcceptConfirmation}
    component={AutoAcceptConfirmationContainer}
/>
