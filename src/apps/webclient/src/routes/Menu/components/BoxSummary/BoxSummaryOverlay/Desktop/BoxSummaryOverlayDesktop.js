import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getIsSimplifyBasketBarEnabled } from 'routes/Menu/selectors/features'
import { DetailsCTAGroup } from '../../Details/DetailsCTAGroup/DetailsCTAGroup'
import { BoxSummaryContentContainer } from '../../BoxSummaryContent'
import css from './BoxSummaryOverlayDesktop.css'
import { boxSummaryOverlayPropTypes } from '../propTypes'
import { useBasketRequiredFeatureEnabled } from '../../../../hooks/useBasketRequiredFeatureEnabled'

const BoxSummaryOverlayDesktop = ({
  onCloseClick,
  onToggleVisibility,
  showDetails,
  date,
  recipes,
  numPortions,
  orderSaveError,
}) => {
  const isBasketRequiredFeatureEnabled = useBasketRequiredFeatureEnabled()
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)

  return (
    <div className={css.supercontainerDesktop}>
      <div
        className={classNames(css.detailContainerDesktop, {
          [css.detailContainerDesktopVariant]: isSimplifyBasketBarEnabled,
          [css.detailContainerDesktopShow]: showDetails,
          [css.isBasketRequiredFeatureEnabled]: isBasketRequiredFeatureEnabled,
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
        <DetailsCTAGroup
          boxDetailsVisibilityChange={onToggleVisibility}
          isBasketRequiredFeatureEnabled={isBasketRequiredFeatureEnabled}
        />
      </div>
    </div>
  )
}

BoxSummaryOverlayDesktop.propTypes = boxSummaryOverlayPropTypes

export { BoxSummaryOverlayDesktop }
