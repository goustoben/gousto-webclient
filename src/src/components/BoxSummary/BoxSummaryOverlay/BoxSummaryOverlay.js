import React from 'react'
import PropTypes from 'prop-types'
import { boxSummaryOverlayPropTypes } from './propTypes'
import { BoxSummaryOverlayMobile } from './Mobile/BoxSummaryOverlayMobile'
import { BoxSummaryOverlayDesktop } from './Desktop/BoxSummaryOverlayDesktop'

const BoxSummaryOverlay = ({ isMobile, ...props }) => {
  if (isMobile) {
    return <BoxSummaryOverlayMobile {...props} />
  }

  return <BoxSummaryOverlayDesktop {...props} />
}

BoxSummaryOverlay.propTypes = {
  isMobile: PropTypes.bool.isRequired,

  ...boxSummaryOverlayPropTypes
}

export { BoxSummaryOverlay }
