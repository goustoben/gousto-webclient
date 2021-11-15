import React from 'react'
import { Route } from 'react-router'
import MainLayout from 'layouts/MainLayout'
import { PrivacyStatement } from './PrivacyStatement'
import { client } from "config/routes"

const route = (
  <Route component={MainLayout}>
    <Route path={client.privacyPolicy} component={PrivacyStatement} />
  </Route>
)

export {
  route,
}
