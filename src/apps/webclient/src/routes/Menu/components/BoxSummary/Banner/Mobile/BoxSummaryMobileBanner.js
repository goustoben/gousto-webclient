import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { MOBILE_VIEW } from 'utils/view'

import { getIsSimplifyBasketBarEnabled } from 'routes/Menu/selectors/features'
import { Tooltip } from 'goustouicomponents'
import { RecipeListContainer } from '../../RecipeList'
import { BannerButtonContainer } from '../../BannerButton'
import { BrowseCTAContainer } from '../../BrowseCTA'
import { BrowseCTAButtonContainer } from '../../BrowseCTAButton'

import { OpenBoxButton } from '../OpenBoxButton'

import css from './BoxSummaryMobileBanner.css'
import { ExpandBoxSummaryButtonContainer } from '../ExpandBoxSummaryButton/ExpandBoxSummaryButtonContainer'

const BoxSummaryMobileBanner = ({
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

  return (
    <div
      className={classNames(css.barmobile, css.isSimplifyBasketBarEnabled)}
      onClick={onExpandClick}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role="button"
    >
      <div>
        <OpenBoxButton />
      </div>
      <div className={classNames(css.summaryMobile, css.buttonsContainerIsSimplifyBasketEnabled)}>
        <ExpandBoxSummaryButtonContainer
          warning={expandWarning}
          onClick={onExpandClick}
          numRecipes={numRecipes}
          view={MOBILE_VIEW}
        />

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

export { BoxSummaryMobileBanner }
