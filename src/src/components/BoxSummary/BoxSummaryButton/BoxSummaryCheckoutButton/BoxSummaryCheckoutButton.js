import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import CheckoutButton from 'BoxSummary/CheckoutButton'
import { Button, Segment } from 'goustouicomponents'
import { basketSum, okRecipes } from 'utils/basket'
import { isMobile } from 'utils/view'
import config from 'config/basket'
import classnames from 'classnames'
import css from '../BoxSummaryButton.css'

const BoxSummaryCheckoutButton = (props) => {

  const { view, recipes, menuRecipes, stock, numPortions, checkoutPending, pricingPending, basketPreviewOrderChangePending, orderSavePending } = props
  const isMobileView = isMobile(view)

  return (
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
  )
}

BoxSummaryCheckoutButton.propTypes = {
  menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
  numPortions: PropTypes.number.isRequired,
  stock: PropTypes.instanceOf(Immutable.Map).isRequired,
  view: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.Map),
  checkoutPending: PropTypes.bool,
  pricingPending: PropTypes.bool,
  orderSavePending: PropTypes.bool,
  basketPreviewOrderChangePending: PropTypes.bool,
}

BoxSummaryCheckoutButton.defaultProps = {
  view: 'desktop',
  checkoutPending: false,
  pricingPending: false,
  orderSavePending: false,
  recipes: Immutable.Map({}),
  basketPreviewOrderChangePending: false,
}

export { BoxSummaryCheckoutButton }
