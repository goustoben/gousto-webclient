import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { getSlotTimes } from 'utils/deliveries'
import { MOBILE_VIEW } from 'utils/view'

import { getIsSimplifyBasketBarEnabled } from 'routes/Menu/selectors/features'
import { Tooltip } from 'goustouicomponents'
import { RecipeListContainer } from '../../RecipeList'
import { BannerButtonContainer } from '../../BannerButton'
import { BrowseCTAContainer } from '../../BrowseCTA'
import { BrowseCTAButtonContainer } from '../../BrowseCTAButton'

import { OpenBoxButton } from './OpenBoxButton'
import { Title } from '../../Title'

import css from './BoxSummaryMobileBanner.css'
import { ExpandBoxSummaryButtonContainer } from '../Desktop/ExpandBoxSummaryButtonContainer'
import { boxSummaryBannerPropTypes } from '../propTypes'
import { useBasketRequiredFeatureEnabled } from '../../../../hooks/useBasketRequiredFeatureEnabled'

const BoxSummaryMobileBanner = ({
  showBrowseCTA,
  maxRecipesNum,
  menuRecipesStore,
  recipes,
  errorText,
  openDetails,
  date,
  deliveryDays,
  slotId,
  isBoxSummaryOpened,
  onExpandClick,
  expandWarning,
  numRecipes,
}) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)

  const handleMobileClick = () => {
    openDetails()
  }

  const slotTime = getSlotTimes({ date, deliveryDays, slotId })

  const isBasketRequiredFeatureEnabled = useBasketRequiredFeatureEnabled()

  return (
    <div
      className={classNames(css.barmobile, {
        [css.hideBanner]: isBoxSummaryOpened && isBasketRequiredFeatureEnabled,
        [css.isSimplifyBasketBarEnabled]: isSimplifyBasketBarEnabled,
      })}
      onClick={isBasketRequiredFeatureEnabled ? null : handleMobileClick}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <div>
        {!isBasketRequiredFeatureEnabled && <OpenBoxButton isSimplifyBasketBarEnabled={isSimplifyBasketBarEnabled} />}
        {!isSimplifyBasketBarEnabled && (
          <Title
            view={MOBILE_VIEW}
            date={date}
            finalisedSlot={slotId !== ''}
            slotTime={slotTime}
          />
        )}
      </div>
      <div
        className={classNames(css.summaryMobile, {
          [css.buttonsContainerIsSimplifyBasketEnabled]: isSimplifyBasketBarEnabled,
        })}
      >
        {isSimplifyBasketBarEnabled ? (
          // Note: showing the button from the "desktop" section for the purposes
          // of the "simplify basket bar" experiment: when productionizing, this
          // should be fixed: probably by getting rid of the desktop/mobile
          // separation altogether.
          <ExpandBoxSummaryButtonContainer
            warning={expandWarning}
            onClick={onExpandClick}
            numRecipes={numRecipes}
            view={MOBILE_VIEW}
          />
        ) : (
          <RecipeListContainer
            view={MOBILE_VIEW}
            recipes={recipes}
            menuRecipesStore={menuRecipesStore}
            maxRecipesNum={maxRecipesNum}
          />
        )}

        {showBrowseCTA && (
          <Tooltip
            message={errorText}
            visible={!!errorText}
            // eslint-disable-next-line react/style-prop-object
            style="button"
            overlayClassName={css.errorTooltipDesktop}
            className={css.errorMessage}
          >
            <BrowseCTAButtonContainer view={MOBILE_VIEW} />
          </Tooltip>
        )}
        {showBrowseCTA ? (
          <BrowseCTAContainer view={MOBILE_VIEW} />
        ) : (
          <Tooltip
            message={errorText}
            visible={!!errorText}
            // eslint-disable-next-line react/style-prop-object
            style="button"
            overlayClassName={css.errorTooltipDesktop}
            className={css.errorMessage}
          >
            <BannerButtonContainer view={MOBILE_VIEW} toggleBasketView={onExpandClick} />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

BoxSummaryMobileBanner.propTypes = {
  date: PropTypes.string,
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  slotId: PropTypes.string,
  onExpandClick: PropTypes.func.isRequired,

  ...boxSummaryBannerPropTypes,
}

BoxSummaryMobileBanner.defaultProps = {
  date: null,
  deliveryDays: [Immutable.Map()],
  slotId: null,
}

export { BoxSummaryMobileBanner }
