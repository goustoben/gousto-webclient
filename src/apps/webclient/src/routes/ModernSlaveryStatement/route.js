import React from 'react'
import { Route } from 'react-router'
import { client } from 'config/routes'
import { MainLayout } from 'layouts/MainLayout'
import { ModernSlaveryStatement } from './ModernSlaveryStatement'

const route = (
  <Route component={MainLayout}>
    <Route path={client.modernSlavery} component={ModernSlaveryStatement} />
  </Route>
)

export {
  route,
}
