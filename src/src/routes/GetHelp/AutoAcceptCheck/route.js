import { Route } from "react-router"
import { AutoAcceptCheckContainer } from "routes/GetHelp/AutoAcceptCheck/AutoAcceptCheckContainer"
import React from "react"

export const AutoAcceptCheck = ({autoAcceptCheck}) => <Route
    path={autoAcceptCheck}
    component={AutoAcceptCheckContainer}
/>
