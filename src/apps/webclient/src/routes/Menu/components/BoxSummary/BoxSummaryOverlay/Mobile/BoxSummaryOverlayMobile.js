import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import Overlay from 'Overlay'
import { MOBILE_VIEW } from 'utils/view'
import { getIsSimplifyBasketBarEnabled } from 'routes/Menu/selectors/features'
import { BoxSummaryContentContainer } from '../../BoxSummaryContent'
import css from './BoxSummaryOverlayMobile.css'
import { boxSummaryOverlayPropTypes } from '../propTypes'

const BoxSummaryOverlayMobile = ({
  onCloseClick,
  onToggleVisibility,
  showDetails,
  date,
  recipes,
  numPortions,
  shouldDisplayFullScreenBoxSummary,
}) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)

  const classNameToApply = shouldDisplayFullScreenBoxSummary
    ? css.fullScreen
    : classNames(css.mobileOverlay, {[css.mobileOverlayIsSimplifyBasketBarEnabled]: isSimplifyBasketBarEnabled})

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
