import React, { PropTypes } from 'react'

import config from 'config/menu'
import BoostAndBalanceBanner from '../BoostAndBalanceBanner'
import FineDineInBanner from '../FineDineInBanner'
import ChristmasBanner from '../ChristmasBanner'

const Banner = ({ isAuthenticated }) => {
  return (isAuthenticated) ? <FineDineInBanner /> : <FineDineInBanner />
}

Banner.propTypes = {
  isAuthenticated: PropTypes.bool,
}

Banner.defaultProps = {
  isAuthenticated: false,
}

export default Banner
