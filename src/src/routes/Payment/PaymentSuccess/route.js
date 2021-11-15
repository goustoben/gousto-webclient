import { Route } from "react-router"
import config from "config/routes"
import { PaymentSuccess } from "routes/Payment/PaymentSuccess/PaymentSuccess"
import React from "react"

export const PaymentSuccess = <Route path={config.client.payment.success} component={PaymentSuccess}/>
