import React from 'react'
import { Route } from 'react-router'
import { PaymentSuccess } from "routes/Payment/PaymentSuccess/route"
import { PaymentFailure } from "routes/Payment/PaymentFailure/route"

export const route = (
  <Route>
    <PaymentSuccess/>
    <PaymentFailure/>
  </Route>
)
