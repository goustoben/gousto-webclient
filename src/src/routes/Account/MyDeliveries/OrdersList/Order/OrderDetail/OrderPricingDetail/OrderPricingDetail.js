import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Immutable from 'immutable'
import Content from 'containers/Content'

import css from './OrderPricingDetail.css'

const OrderPricingDetail = ({
	paymentDate,
	numberOfRecipes,
	priceBreakdown,
}) => {
	const flatDiscountAmount = priceBreakdown.get('flatDiscountAmount') != null ? priceBreakdown.get('flatDiscountAmount') : 0
	const percentageDiscountAmount = priceBreakdown.get('percentageDiscountAmount') != null ? priceBreakdown.get('percentageDiscountAmount') : 0
	const grossRecipesPrice = priceBreakdown.get('grossRecipesPrice') != null ? priceBreakdown.get('grossRecipesPrice') : ''
	const grossExtrasPrice = priceBreakdown.get('grossExtrasPrice') != null ? priceBreakdown.get('grossExtrasPrice') : 0
	const grossShippingPrice = priceBreakdown.get('grossShippingPrice') != null ? priceBreakdown.get('grossShippingPrice') : 0
	const netOrderPrice = priceBreakdown.get('netOrderPrice') != null ? priceBreakdown.get('netOrderPrice') : ''

	let discountRender = null
	if (percentageDiscountAmount && flatDiscountAmount) {
		discountRender = (
			<div className={`${css.row} ${css.green} ${css.separationBelow}`}>
				<span>{percentageDiscountAmount}% Discount</span>
				<span>-£{flatDiscountAmount.toFixed(2)}</span>
			</div>
		)
	}
	if (!percentageDiscountAmount && flatDiscountAmount) {
		discountRender = (
			<div className={`${css.row} ${css.green} ${css.separationBelow}`}>
				<span>
					<Content contentKeys="mydeliveriesOrderOrderpricingDiscountcallout" >
						<span>Discount</span>
					</Content>
				</span>
				<span>-£{flatDiscountAmount.toFixed(2)}</span>
			</div>
		)
	}

	return (
		<div className={css.paymentInfo} data-testing="recipesPricingDetailSection">
			<div className={`${css.row} ${css.bold}`}>
				Payment on {paymentDate}
			</div>
			<div className={css.row}>
				<span>{numberOfRecipes} recipes</span>
				{typeof(grossRecipesPrice) === 'number' ?
					<span>£{grossRecipesPrice.toFixed(2)}</span>
					: null}
			</div>
			{discountRender}
			{grossExtrasPrice ?
				<div className={`${css.row} ${css.separationBelow}`}>
					<span>
						<Content contentKeys="mydeliveriesOrderOrderpricingExtras" >
							<span>Extras</span>
						</Content>
					</span>
					<span>£{grossExtrasPrice.toFixed(2)}</span>
				</div>
				: null}
			<div className={`${css.row} ${css.separationBelow}`}>
				<span>
					<Content contentKeys="mydeliveriesOrderOrderpricingDelivery" >
						<span>Delivery cost</span>
					</Content>
				</span>
				{grossShippingPrice ?
					<span>£{grossShippingPrice.toFixed(2)}</span>
					:
					<span>
						<Content contentKeys="mydeliveriesOrderOrderpricingDeliveryfree" >
							<span>Free</span>
						</Content>
					</span>
				}
			</div>
			<div className={`${css.row} ${css.bold}`}>
				<span>Total</span>
				{typeof(netOrderPrice) === 'number' ?
					<span>£{netOrderPrice.toFixed(2)}</span>
					: null}
			</div>
		</div>
	)
}

OrderPricingDetail.propTypes = {
	paymentDate: PropTypes.string,
	numberOfRecipes: PropTypes.number,
	priceBreakdown: ImmutablePropTypes.mapContains({
		flatDiscountAmount: PropTypes.number,
		percentageDiscountAmount: PropTypes.number,
		grossRecipesPrice: PropTypes.number,
		grossExtrasPrice: PropTypes.number,
		grossShippingPrice: PropTypes.number,
		netOrderPrice: PropTypes.number,
	}),
}

OrderPricingDetail.defaultProps = {
	paymentDate: '',
	numberOfRecipes: 0,
	priceBreakdown: Immutable.Map({}),
}

export default OrderPricingDetail
