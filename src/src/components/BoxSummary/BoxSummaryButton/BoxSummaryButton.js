import React, { PropTypes } from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import classnames from 'classnames'
import css from './BoxSummaryButton.css'

import { Button, Segment } from 'goustouicomponents'
import CheckoutButton from 'BoxSummary/CheckoutButton'

import config from 'config/basket'
import { basketSum, okRecipes } from 'utils/basket'
import { boxSummaryViews } from 'utils/boxSummary'

const BoxSummaryButton = ({ view, recipes, showDetails, open, checkoutPending, boxSummaryCurrentView, menuRecipes, stock, numPortions, boxSummaryNext, fullWidth, pricingPending }) => {
  const isMobile = view === 'mobile'
  const classes = [
    { [css.buttoncontainer]: isMobile },
    { [css.buttoncontainerFull]: fullWidth && isMobile },
    { [css.coButton]: !isMobile },
  ]

  return (<div className={classnames(...classes)}>
		{(boxSummaryCurrentView === boxSummaryViews.DETAILS) ?
			<CheckoutButton view={`${view}NextButton`}>
				<Button
				  data-testing={`${view}BoxSummaryButton`}
				  disabled={checkoutPending || (basketSum(okRecipes(recipes, menuRecipes, stock, numPortions)) < config.minRecipesNum)}
				  pending={checkoutPending || pricingPending}
				  spinnerClassName={css.coSpinner}
				  spinnerContainerClassName={css.coSpinnerContainer}
				  width="full"
				>
					<Segment
					  className={classnames({
					    [css.submitButton]: view === 'mobile',
					    [css.coButtonSegment]: view !== 'mobile',
					  })}
					>
						Checkout
					</Segment>
				</Button>
			</CheckoutButton>
		  :
			<Button width="full" pending={pricingPending}>
				<Segment
				  className={classnames({
				    [css.submitButton]: view === 'mobile',
				    [css.coButtonSegment]: view !== 'mobile',
				  })}
				  onClick={showDetails ? boxSummaryNext : open}
				>
					Next
				</Segment>
			</Button>}
	</div>)
}

BoxSummaryButton.propTypes = {
  view: React.PropTypes.string,
  recipes: React.PropTypes.instanceOf(Immutable.Map),
  showDetails: React.PropTypes.bool.isRequired,
  checkoutPending: React.PropTypes.bool,
  open: React.PropTypes.func.isRequired,
  boxSummaryCurrentView: React.PropTypes.string,
  numPortions: PropTypes.number.isRequired,
  menuRecipes: PropTypes.instanceOf(Immutable.List).isRequired,
  stock: PropTypes.instanceOf(Immutable.Map).isRequired,
  boxSummaryNext: React.PropTypes.func.isRequired,
  fullWidth: React.PropTypes.bool,
  pricingPending: React.PropTypes.bool,
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
