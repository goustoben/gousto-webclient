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

  return null
}

export { BoxSummaryDesktopBanner }
