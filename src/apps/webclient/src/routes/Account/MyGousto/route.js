import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import { MyGoustoContainer } from './MyGoustoContainer'

export const MyGousto = (
  <Route path={config.client.myGousto} component={MyGoustoContainer} />
)
