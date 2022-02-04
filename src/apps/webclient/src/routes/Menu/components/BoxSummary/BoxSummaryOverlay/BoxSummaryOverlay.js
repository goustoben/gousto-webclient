import React from 'react'
import PropTypes from 'prop-types'
import { boxSummaryOverlayPropTypes } from './propTypes'
import { BoxSummaryOverlayMobile } from './Mobile/BoxSummaryOverlayMobile'
import { BoxSummaryOverlayDesktop } from './Desktop/BoxSummaryOverlayDesktop'
import { useBrowserBack } from '../../../../../hooks/useBrowserBack'

const BoxSummaryOverlay = ({ isMobile, onCloseClick, onToggleVisibility, showDetails, date, recipes, numPortions,
  shouldDisplayFullScreenBoxSummary, orderSaveError, isBackClosesModalEnabled }) => {
  const onClose = useBrowserBack(isBackClosesModalEnabled && showDetails ? onCloseClick : null)
  if (isMobile) {
    return (
      <BoxSummaryOverlayMobile
        onCloseClick={isBackClosesModalEnabled ? onClose : onCloseClick}
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
      onCloseClick={isBackClosesModalEnabled ? onClose : onCloseClick}
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
