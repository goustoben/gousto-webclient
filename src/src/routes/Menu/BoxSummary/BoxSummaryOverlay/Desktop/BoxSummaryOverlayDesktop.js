import React from 'react'

import { BoxSummaryContentContainer } from '../../BoxSummaryContent'
import css from './BoxSummaryOverlayDesktop.module.css'
import { boxSummaryOverlayPropTypes } from '../propTypes'

const BoxSummaryOverlayDesktop = ({ onCloseClick, onToggleVisibility, showDetails, date, recipes, numPortions, orderSaveError }) => (
  <div className={css.supercontainerdesktop}>
    <div className={showDetails ? css.detailContainerdesktopShow : css.detailContainerdesktop} data-testing="boxSummaryDesktop">
      <span>
        <div className={css.closeBtn} role="button" onClick={onCloseClick} tabIndex={0} onKeyPress={onCloseClick} />
        <BoxSummaryContentContainer
          recipes={recipes}
          date={date}
          numPortions={numPortions}
          showDetails={showDetails}
          orderSaveError={orderSaveError}
          boxDetailsVisibilityChange={onToggleVisibility}
          view="desktop"
        />
      </span>
    </div>
  </div>
)

BoxSummaryOverlayDesktop.propTypes = boxSummaryOverlayPropTypes

export { BoxSummaryOverlayDesktop }
