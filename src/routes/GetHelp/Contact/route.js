import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

import ContactContainer from './ContactContainer'

export default (
    <Route path={configRoutes.client.getHelp.contact} component={ContactContainer} />
)
