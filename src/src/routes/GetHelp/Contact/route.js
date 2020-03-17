import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'

import { ContactContainer } from './ContactContainer'

const Contact = (
  <Route path={configRoutes.client.getHelp.contact} component={ContactContainer} />
)

export {
  Contact
}
