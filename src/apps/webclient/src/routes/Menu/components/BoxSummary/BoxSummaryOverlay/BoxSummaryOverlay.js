import React from 'react'
import PropTypes from 'prop-types'
import { useBrowserBack } from 'hooks/useBrowserBack'
import { boxSummaryOverlayPropTypes } from './propTypes'
import { BoxSummaryOverlayMobile } from './Mobile/BoxSummaryOverlayMobile'
import { BoxSummaryOverlayDesktop } from './Desktop/BoxSummaryOverlayDesktop'

const BoxSummaryOverlay = ({
  isMobile,
  onCloseClick,
  onToggleVisibility,
  showDetails,
  date,
  recipes,
  numPortions,
  shouldDisplayFullScreenBoxSummary,
  orderSaveError,
}) => {
  const onClose = useBrowserBack(showDetails ? onCloseClick : null)
  if (isMobile) {
    return (
      <BoxSummaryOverlayMobile
        onCloseClick={onClose}
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
      onCloseClick={onClose}
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

  ...boxSummaryOverlayPropTypes,
}

export { BoxSummaryOverlay }
