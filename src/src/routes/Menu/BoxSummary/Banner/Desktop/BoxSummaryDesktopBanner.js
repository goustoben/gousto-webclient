import React from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from 'goustouicomponents'
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
  openDetails
}) => (
  <div className={css.bardesktop} data-testing="box-summary-desktop-banner">
    <RecipeListContainer view="desktop" recipes={recipes} menuRecipesStore={menuRecipesStore} maxRecipesNum={maxRecipesNum} />
    <span className={css.buttonsContainer}>
      {
        showBrowseCTA
          ? (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              style="button"
              overlayClassName={css.errorTooltipDesktop}
              className={css.errorMessage}
            >
              <BrowseCTAButtonContainer view="desktop" />
            </Tooltip>
          )
          : (
            <ExpandBoxSummaryButtonContainer key={0} warning={expandWarning} onClick={onExpandClick} numRecipes={numRecipes} />
          )
      }

      {
        showBrowseCTA
          ? (
            <BrowseCTAContainer view="desktop" />
          )
          : (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              style="button"
              overlayClassName={css.errorTooltipDesktop}
              className={css.errorMessage}
            >
              <BannerButtonContainer view="desktop" open={openDetails} />
            </Tooltip>
          )
      }
    </span>
  </div>
)

BoxSummaryDesktopBanner.propTypes = {
  expandWarning: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  numRecipes: PropTypes.number.isRequired,

  ...boxSummaryBannerPropTypes
}

export { BoxSummaryDesktopBanner }
