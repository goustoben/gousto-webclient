import React from 'react'

import Overlay from 'components/Overlay'
import { MOBILE_VIEW } from 'utils/view'

import { BoxSummaryContentContainer } from '../../BoxSummaryContent'
import { boxSummaryOverlayPropTypes } from '../propTypes'

import css from './BoxSummaryOverlayMobile.css'

const BoxSummaryOverlayMobile = ({
  onCloseClick,
  onToggleVisibility,
  showDetails,
  date,
  recipes,
  numPortions,
  shouldDisplayFullScreenBoxSummary,
}) => {
  const classNameToApply = shouldDisplayFullScreenBoxSummary ? css.fullScreen : css.mobileOverlay

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
      </div>
    </Overlay>
  )
}

BoxSummaryOverlayMobile.propTypes = boxSummaryOverlayPropTypes

export { BoxSummaryOverlayMobile }
