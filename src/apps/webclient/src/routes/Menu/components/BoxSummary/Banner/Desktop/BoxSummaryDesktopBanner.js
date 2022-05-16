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

import { ExpandBoxSummaryButtonContainer } from './ExpandBoxSummaryButtonContainer'

import css from './BoxSummaryDesktopBanner.css'
import { boxSummaryBannerPropTypes } from '../propTypes'

const BoxSummaryDesktopBanner = ({
  showBrowseCTA,
  maxRecipesNum,
  menuRecipesStore,
  numRecipes,
  recipes,
  errorText,
  expandWarning,
  onExpandClick,
}) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)
  const isActionBarRedesignEnabled = useIsActionBarRedesignEnabled()

  return (
    <div className={isSimplifyBasketBarEnabled ? css.bardesktopVariant : css.bardesktop}>
      {!isSimplifyBasketBarEnabled && (
        <RecipeListContainer
          view="desktop"
          recipes={recipes}
          menuRecipesStore={menuRecipesStore}
          maxRecipesNum={maxRecipesNum}
        />
      )}

      {isSimplifyBasketBarEnabled && isActionBarRedesignEnabled ? (
        <ActionBar variant="embedded" />
      ) : null}
      <div
        className={isSimplifyBasketBarEnabled ? css.buttonsContainerVariant : css.buttonsContainer}
      >
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

BoxSummaryDesktopBanner.propTypes = {
  expandWarning: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  numRecipes: PropTypes.number.isRequired,

  ...boxSummaryBannerPropTypes,
}

export { BoxSummaryDesktopBanner }
