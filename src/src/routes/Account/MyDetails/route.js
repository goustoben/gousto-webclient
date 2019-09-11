import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import MyDetailsContainer from './MyDetailsContainer'

export default (
  <Route path={config.client.myDetails} component={MyDetailsContainer} />
)
