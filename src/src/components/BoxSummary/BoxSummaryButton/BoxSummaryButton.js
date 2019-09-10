import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'
import { RecipesCountButton } from 'RecipesCountButton'

import { boxSummaryViews } from 'utils/boxSummary'
import { isMobile, DESKTOP_VIEW } from 'utils/view'
import { BoxSummaryCheckoutButton } from './BoxSummaryCheckoutButton'
import { BoxSummaryNextButton } from './BoxSummaryNextButton'
import css from './BoxSummaryButton.css'

const BoxSummaryButton = ({ view,
  recipes,
  showDetails,
  open, checkoutPending, boxSummaryCurrentView, menuRecipes,
  stock, numPortions, boxSummaryNext, fullWidth, pricingPending,
  orderSavePending, basketPreviewOrderChangePending, showRecipeCountButton }) => {
  const isMobileView = isMobile(view)
  const classes = [
    { [css.buttoncontainer]: isMobileView },
    { [css.buttoncontainerFull]: fullWidth && isMobileView },
    { [css.coButton]: !isMobileView },
  ]
  const checkoutButtonProps = {
    view,
    recipes,
    checkoutPending,
    numPortions,
    menuRecipes,
    stock,
    pricingPending,
    orderSavePending,
    basketPreviewOrderChangePending,
  }

  const nextButtonProps = {
    pricingPending, view, showDetails, boxSummaryNext, open
  }

  const checkoutButton = showRecipeCountButton ?
    (<RecipesCountButton />) :
    (<BoxSummaryCheckoutButton {...checkoutButtonProps} />)

  return (
    <div className={classnames(...classes)}>
      {
        (boxSummaryCurrentView === boxSummaryViews.DETAILS) ?
          checkoutButton
          :
          <BoxSummaryNextButton {...nextButtonProps} />}
    </div>)
}

BoxSummaryButton.propTypes = {
  showRecipeCountButton: PropTypes.bool,
  view: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.Map),
  showDetails: PropTypes.bool.isRequired,
  checkoutPending: PropTypes.bool,
  open: PropTypes.func.isRequired,
  boxSummaryCurrentView: PropTypes.string,
  numPortions: PropTypes.number.isRequired,
  menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
  stock: PropTypes.instanceOf(Immutable.Map).isRequired,
  boxSummaryNext: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  pricingPending: PropTypes.bool,
  orderSavePending: PropTypes.bool,
  basketPreviewOrderChangePending: PropTypes.bool,
}

BoxSummaryButton.defaultProps = {
  view: DESKTOP_VIEW,
  checkoutPending: false,
  recipes: Immutable.Map({}),
  showDetails: false,
  boxSummaryCurrentView: '',
  fullWidth: false,
  showRecipeCountButton: false,
}

export default BoxSummaryButton
