import { Route } from "react-router"
import { DeliveryValidationContainer } from "routes/GetHelp/Delivery/DeliveryValidation/DeliveryValidationContainer"
import React from "react"

export const DeliveryValidation = ({deliveryDidntArriveValidation}) => <Route
    path={deliveryDidntArriveValidation}
    component={DeliveryValidationContainer}
/>
