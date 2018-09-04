import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

import ContactUsContainer from './ContactUsContainer'

export default (
    <Route path={configRoutes.client.getHelp.contact} component={ContactUsContainer} />
)
