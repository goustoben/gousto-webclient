import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import { ReferralContainer } from './ReferralContainer'

export const Referral = (
  <Route path={config.client.myReferral} component={ReferralContainer} />
)
