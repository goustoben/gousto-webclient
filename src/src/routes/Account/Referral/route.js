import React from 'react'
import { Route } from 'react-router'
import Referral from './Referral'
import config from 'config/routes'

export default (
	<Route path={config.client.myReferral} component={Referral} />
)
