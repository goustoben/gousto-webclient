import React from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from 'goustouicomponents'
import { useSelector } from 'react-redux'
import { getIsSimplifyBasketBarEnabled } from 'routes/Menu/selectors/features'
import { useIsActionBarRedesignEnabled } from 'routes/Menu/hooks/useIsActionBarRedesignEnabled'
import { ActionBar } from 'routes/Menu/components/ActionBar'
import { RecipeListContainer } from '../../RecipeList'
import { BannerButtonContainer } from '../../BannerButton'
import { BrowseCTAContainer } from '../../BrowseCTA'
import { BrowseCTAButtonContainer } from '../../BrowseCTAButton'

import { ExpandBoxSummaryButtonContainer } from '../ExpandBoxSummaryButton/ExpandBoxSummaryButtonContainer'

import css from './BoxSummaryDesktopBanner.css'

const BoxSummaryDesktopBanner = ({
  showBrowseCTA,
  maxRecipesNum,
  menuRecipesStore,
  recipes,
  errorText,
  onExpandClick,
  expandWarning,
  numRecipes,
}) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)
  const isActionBarRedesignEnabled = useIsActionBarRedesignEnabled()

  return (
    <div className={css.bardesktopVariant}>
      {isActionBarRedesignEnabled ? <ActionBar variant="embedded" /> : null}
      <div className={css.buttonsContainerVariant}>
        {showBrowseCTA ? (
          <Tooltip
            message={errorText}
            visible={!!errorText}
            style="button"
            overlayClassName={css.errorTooltipDesktop}
            className={css.errorMessage}
          >
            <BrowseCTAButtonContainer view="desktop" />
          </Tooltip>
        ) : (
          <ExpandBoxSummaryButtonContainer
            warning={expandWarning}
            onClick={onExpandClick}
            numRecipes={numRecipes}
            view="desktop"
          />
        )}

        {showBrowseCTA ? (
          <BrowseCTAContainer view="desktop" />
        ) : (
          <Tooltip
            message={errorText}
            visible={!!errorText}
            style="button"
            overlayClassName={css.errorTooltipDesktop}
            className={css.errorMessage}
          >
            <BannerButtonContainer view="desktop" toggleBasketView={onExpandClick} />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export { BoxSummaryDesktopBanner }
