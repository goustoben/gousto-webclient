import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'
import ConfirmationContainer from './ConfirmationContainer'

export default (
    <Route path={configRoutes.client.getHelp.confirmation} component={ConfirmationContainer} />
)
