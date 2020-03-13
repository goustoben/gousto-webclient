import React from 'react'
import PropTypes from 'prop-types'
import { boxSummaryOverlayPropTypes } from './propTypes'
import { BoxSummaryOverlayMobile } from './Mobile/BoxSummaryOverlayMobile'
import { BoxSummaryOverlayDesktop } from './Desktop/BoxSummaryOverlayDesktop'

const BoxSummaryOverlay = ({ isMobile, onCloseClick, onToggleVisibility, showDetails, date, recipes, numPortions, shouldDisplayFullScreenBoxSummary, orderSaveError}) => {
  if (isMobile) {
    return (
      <BoxSummaryOverlayMobile
        onCloseClick={onCloseClick}
        onToggleVisibility={onToggleVisibility}
        showDetails={showDetails}
        date={date}
        recipes={recipes}
        numPortions={numPortions}
        shouldDisplayFullScreenBoxSummary={shouldDisplayFullScreenBoxSummary}
      />
    )
  }

  return (
    <BoxSummaryOverlayDesktop
      onCloseClick={onCloseClick}
      onToggleVisibility={onToggleVisibility}
      showDetails={showDetails}
      date={date}
      recipes={recipes}
      numPortions={numPortions}
      orderSaveError={orderSaveError}
    />
  )
}

BoxSummaryOverlay.propTypes = {
  isMobile: PropTypes.bool.isRequired,

  ...boxSummaryOverlayPropTypes
}

export { BoxSummaryOverlay }
