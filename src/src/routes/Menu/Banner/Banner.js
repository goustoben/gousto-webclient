import React from 'react'
import moment from 'moment'

import config from 'config/menu'
import ChristmasBanner from '../ChristmasBanner'
import { JoeWicksBanner } from '../JoeWicksBanner'

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
