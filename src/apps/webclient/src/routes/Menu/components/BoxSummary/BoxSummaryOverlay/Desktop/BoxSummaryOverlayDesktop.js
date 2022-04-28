import React from 'react'
import classNames from 'classnames'
import { BoxSummaryContentContainer } from '../../BoxSummaryContent'
import css from './BoxSummaryOverlayDesktop.css'
import { boxSummaryOverlayPropTypes } from '../propTypes'

const BoxSummaryOverlayDesktop = ({
  onCloseClick,
  onToggleVisibility,
  showDetails,
  date,
  recipes,
  numPortions,
  orderSaveError,
}) => (
  <div className={css.supercontainerDesktop}>
    <div
      className={classNames(css.detailContainerDesktop, {
        [css.detailContainerDesktopShow]: showDetails,
      })}
      data-testing="boxSummaryDesktop"
    >
      <div className={css.scrollingContent}>
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
          numPortions={numPortions}
          showDetails={showDetails}
          orderSaveError={orderSaveError}
          boxDetailsVisibilityChange={onToggleVisibility}
          view="desktop"
        />
      </div>
    </div>
  </div>
)

BoxSummaryOverlayDesktop.propTypes = boxSummaryOverlayPropTypes

export { BoxSummaryOverlayDesktop }
