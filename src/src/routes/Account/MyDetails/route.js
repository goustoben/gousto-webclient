import React from 'react'
import { Route } from 'react-router'
import MyDetailsContainer from './MyDetailsContainer'
import config from 'config/routes'

export default (
  <Route path={config.client.myDetails} component={MyDetailsContainer} />
)
