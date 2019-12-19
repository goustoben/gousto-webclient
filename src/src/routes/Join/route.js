import React from 'react'
import { Route, Redirect } from 'react-router'
import FullPage from 'layouts/FullPage'
import JoinContainer from './JoinContainer'

export default (
  <Route component={FullPage} footerType="simple">
    <Route path="/join" component={JoinContainer} />
    <Redirect from="/join2" to="/join" />
  </Route>
)
