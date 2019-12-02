import React from 'react'

import Overlay from 'Overlay'
import { MOBILE_VIEW } from 'utils/view'
import { BoxSummaryContentContainer } from '../../BoxSummaryContent'
import css from './BoxSummaryOverlayMobile.css'
import { boxSummaryOverlayPropTypes } from '../propTypes'

const BoxSummaryOverlayMobile = ({ onCloseClick, onToggleVisibility, showDetails, date, recipes, numPortions }) => {
  return (
    <Overlay open={showDetails} className={css.mobileOverlay} contentClassName={css.mobileModalContent} from="bottom">
      <div className={css.supercontainermobile}>
        <div className={css.detailContainermobile} data-testing="boxSummaryMobile">
          <div className={css.closeBtn} onClick={onCloseClick}></div>
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
