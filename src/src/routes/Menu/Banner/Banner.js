import React, { PropTypes } from 'react'

import ChristmasBanner from '../ChristmasBanner'

const Banner = ({ isAuthenticated }) => {
  return (isAuthenticated) ? <ChristmasBanner /> : <ChristmasBanner />
}

Banner.propTypes = {
  isAuthenticated: PropTypes.bool,
}

Banner.defaultProps = {
  isAuthenticated: false,
}

export default Banner
