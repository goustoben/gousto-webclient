import { Route } from "react-router"
import { DeliveryContainer } from "routes/GetHelp/Delivery/DeliveryContainer"
import React from "react"

export const Delivery = ({delivery}) => <Route
    path={delivery({userId: ':userId', orderId: ':orderId'})}
    component={DeliveryContainer}
/>
