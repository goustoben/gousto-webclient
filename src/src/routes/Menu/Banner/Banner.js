import React from 'react'
import moment from 'moment'

import { JoeWicksBanner } from '../JoeWicksBanner'
import { ChristmasBanner } from '../ChristmasBanner'

export const Banner = ({ switchoverDate }) => {
  const now = moment()
  const switchoverTime = moment(switchoverDate)

  return (now.isSameOrAfter(switchoverTime, 'day')) ? (
    <JoeWicksBanner />
  ) : (
    <ChristmasBanner />
  )
}
