import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import classnames from 'classnames'

import { Button, Segment } from 'goustouicomponents'
import CheckoutButton from 'BoxSummary/CheckoutButton'

import config from 'config/basket'
import { basketSum, okRecipes } from 'utils/basket'
import { isMobile } from 'utils/view'
import { boxSummaryViews } from 'utils/boxSummary'
import css from './BoxSummaryButton.css'

const BoxSummaryButton = ({ view, recipes, showDetails, open, checkoutPending, boxSummaryCurrentView, menuRecipes, stock, numPortions, boxSummaryNext, fullWidth, pricingPending, orderSavePending, basketPreviewOrderChangePending }) => {
  const isMobileView = isMobile(view)
  const classes = [
    { [css.buttoncontainer]: isMobileView },
    { [css.buttoncontainerFull]: fullWidth && isMobileView },
    { [css.coButton]: !isMobileView },
  ]

  return (
    <div className={classnames(...classes)}>
      {(boxSummaryCurrentView === boxSummaryViews.DETAILS) ?
        <CheckoutButton view={`${view}NextButton`}>
          <Button
            data-testing={`${view}BoxSummaryButton`}
            disabled={checkoutPending || (basketSum(okRecipes(recipes, menuRecipes, stock, numPortions)) < config.minRecipesNum)}
            pending={checkoutPending || pricingPending || basketPreviewOrderChangePending || orderSavePending}
            spinnerClassName={css.coSpinner}
            spinnerContainerClassName={css.coSpinnerContainer}
            width="full"
          >
            <Segment
              className={classnames({
                [css.submitButton]: isMobileView,
                [css.coButtonSegment]: !isMobileView,
              })}
            >
              Checkout
            </Segment>
          </Button>
        </CheckoutButton>
        :
        <Button width="full" pending={pricingPending} data-testing={`${view}BoxSummaryNextButton`}>
          <Segment
            className={classnames({
              [css.submitButton]: isMobileView,
              [css.coButtonSegment]: !isMobileView,
            })}
            onClick={showDetails ? boxSummaryNext : open}
          >
            Next
          </Segment>
        </Button>}
    </div>)
}

BoxSummaryButton.propTypes = {
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
  view: 'desktop',
  checkoutPending: false,
  recipes: Immutable.Map({}),
  showDetails: false,
  boxSummaryCurrentView: '',
  fullWidth: false,
}

export default BoxSummaryButton
