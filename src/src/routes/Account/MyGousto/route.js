import React from 'react'
import { Route } from 'react-router'
import MyGoustoContainer from './MyGoustoContainer'
import config from 'config/routes'

export default (
  <Route path={config.client.myGousto2} component={MyGoustoContainer} />
)
