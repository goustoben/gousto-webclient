import React from 'react'
import configRoute from 'config/routes'
import Immutable from 'immutable'  /* eslint-disable new-cap */
import { H3 } from 'Page/Header'
import Receipt from 'Receipt'
import Link from 'Link'
import Loading from 'Loading'
import css from './Summary.css'
import { getSurchargeItems } from 'utils/pricing'
import { basketSum } from 'utils/basket'

class Summary extends React.PureComponent {

	static propTypes = {
		prices: React.PropTypes.instanceOf(Immutable.Map),
		basketRecipes: React.PropTypes.object,
		deliveryDate: React.PropTypes.string,
		slotId: React.PropTypes.string,
		browser: React.PropTypes.string,
		showPromocode: React.PropTypes.bool,
		routing: React.PropTypes.object,
		isLoading: React.PropTypes.bool,
	}

	static defaultProps = {
		prices: Immutable.Map({}),
		basketRecipes: Immutable.Map({}),
		deliveryDate: '',
		slotId: '',
		showPromocode: false,
		loadingPreviewOrder: false,
	}

	render() {
		const { prices, basketRecipes } = this.props
		const numRecipes = basketSum(basketRecipes)

		const isMobile = this.props.browser === 'mobile'
		const isLoading = this.props.isLoading
		let currentStep

		const routing = this.props.routing
		if (routing && routing.locationBeforeTransitions) {
			if (routing.locationBeforeTransitions.pathname) {
				const pathnameArray = routing.locationBeforeTransitions.pathname.split('/')
				currentStep = pathnameArray.pop()
			}
		}

		return (
			<div className={css.summaryContainer}>
				<H3 headlineFont>Order total</H3>
				{
					(isLoading)
					? <div className={css.loaderContainer}><Loading /></div>
					: <div className={css.details}>
						<Receipt
							numRecipes={numRecipes}
							prices={prices}
							deliveryTotalPrice={prices.get('deliveryTotal')}
							surcharges={getSurchargeItems(prices.get('items'))}
							surchargeTotal={prices.get('surchargeTotal')}
							recipeTotalPrice={prices.get('recipeTotal')}
							totalToPay={prices.get('total')}
							recipeDiscountAmount={prices.get('recipeDiscount')}
							recipeDiscountPercent={prices.get('percentageOff')}
							extrasTotalPrice={prices.get('productTotal')}
							showAddPromocode
						/>
						<div>
							{(currentStep !== 'payment' && !isMobile) ?
								<Link to={configRoute.client.menu} className={css.link}>
									Edit order&nbsp;<span className={css.arrowRight} />
								</Link> : null
							}
						</div>
					</div>
				}
			</div>
		)
	}
}

export default Summary
