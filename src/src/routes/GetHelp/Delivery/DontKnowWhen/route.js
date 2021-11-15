import { Route } from "react-router"
import React from "react"
import { DontKnowWhenContainer } from "routes/GetHelp/Delivery/DontKnowWhen/DontKnowWhenContainer"

export const DontKnowWhen = ({deliveryDontKnowWhen}) => <Route
    path={deliveryDontKnowWhen({userId: ':userId', orderId: ':orderId'})}
    component={DontKnowWhenContainer}
/>
