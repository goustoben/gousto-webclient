import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

const ContactUsContainer = () => (
    <div>Test</div>
)

export default (
    <Route path={configRoutes.getHelp.contactUs} component={ContactUsContainer} />
)
