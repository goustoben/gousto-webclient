import { Route } from "react-router"
import config from "config/routes"
import { PaymentFailure } from "routes/Payment/PaymentFailure/PaymentFailure"
import React from "react"

export const PaymentFailure = <Route path={config.client.payment.failure} component={PaymentFailure}/>
