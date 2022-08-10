import React from 'react'

import { Route } from 'react-router'

import { AccountDetails as AccountDetailsPage } from '@features/account-details'

import config from 'config/routes'

export const AccountDetails = (
  <Route path={config.client.accountDetails} component={AccountDetailsPage} />
)
