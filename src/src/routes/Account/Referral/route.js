import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import Referral from './ReferralContainer'

export default (
  <Route path={config.client.myReferral} component={Referral} />
)
