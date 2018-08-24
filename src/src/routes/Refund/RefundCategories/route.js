import React from 'react'
import { Route } from 'react-router'

import configRoutes from 'config/routes'
import RefundCategoriesContainer from './RefundCategoriesContainer'

export default (
    <Route path={configRoutes.getHelp.categories} component={RefundCategoriesContainer} />
)
