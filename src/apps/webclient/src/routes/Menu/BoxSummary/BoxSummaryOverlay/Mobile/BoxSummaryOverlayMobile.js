import React from 'react'

import Overlay from 'Overlay'
import { MOBILE_VIEW } from 'utils/view'
import { DetailsCTAGroup } from 'routes/Menu/BoxSummary/Details/DetailsCTAGroup/DetailsCTAGroup'
import { BoxSummaryContentContainer } from '../../BoxSummaryContent'
import css from './BoxSummaryOverlayMobile.css'
import { boxSummaryOverlayPropTypes } from '../propTypes'
import { useBasketRequiredFeatureEnabled } from '../../../hooks/useBasketRequiredFeatureEnabled'

const BoxSummaryOverlayMobile = ({
  onCloseClick,
  onToggleVisibility,
  showDetails,
  date,
  recipes,
  numPortions,
  shouldDisplayFullScreenBoxSummary,
}) => {
  const isBasketRequiredFeatureEnabled = useBasketRequiredFeatureEnabled()
  const classNameToApply = shouldDisplayFullScreenBoxSummary || isBasketRequiredFeatureEnabled
    ? css.fullScreen
    : css.mobileOverlay

  return (
    <Overlay
      open={showDetails}
      className={classNameToApply}
      contentClassName={css.mobileModalContent}
      from="bottom"
    >
      <div className={css.supercontainerMobile}>
        <div className={css.detailContainerMobile} data-testing="boxSummaryMobile">
          <div
            className={css.closeBtn}
            role="button"
            onClick={onCloseClick}
            tabIndex={0}
            onKeyPress={onCloseClick}
          />
          <BoxSummaryContentContainer
            recipes={recipes}
            date={date}
            showDetails={showDetails}
            boxDetailsVisibilityChange={onToggleVisibility}
            view={MOBILE_VIEW}
            numPortions={numPortions}
          />
        </div>
        <DetailsCTAGroup
          boxDetailsVisibilityChange={onToggleVisibility}
          isBasketRequiredFeatureEnabled={isBasketRequiredFeatureEnabled}
        />
      </div>
    </Overlay>
  )
}

BoxSummaryOverlayMobile.propTypes = boxSummaryOverlayPropTypes

export { BoxSummaryOverlayMobile }
