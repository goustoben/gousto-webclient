import React from 'react'
import moment from 'moment'

import config from 'config/menu'
import { JoeWicksBanner } from '../JoeWicksBanner'
import { ChristmasBanner } from '../ChristmasBanner'

const { switchoverDate } = config.jwBanner

export const Banner = () => {
  const now = moment()
  const switchoverTime = moment(switchoverDate)

  return (now.isSameOrAfter(switchoverTime, 'day')) ? (
    <JoeWicksBanner />
  ) : (
    <ChristmasBanner />
  )
}
