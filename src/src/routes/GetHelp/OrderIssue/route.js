import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'
import OrderIssueContainer from './OrderIssueContainer'

export default (
    <Route path={configRoutes.client.getHelp.orderIssue} component={OrderIssueContainer} />
)
