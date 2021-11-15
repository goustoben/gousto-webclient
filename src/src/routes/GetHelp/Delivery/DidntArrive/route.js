import { Route } from "react-router"
import { DidntArriveContainer } from "routes/GetHelp/Delivery/DidntArrive/DidntArriveContainer"
import React from "react"

export const DidntArrive = ({deliveryDidntArrive}) => <Route
    path={deliveryDidntArrive({userId: ':userId', orderId: ':orderId'})}
    component={DidntArriveContainer}
/>
