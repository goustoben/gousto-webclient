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

  return null
}

export { BoxSummaryMobileBanner }
