import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import moment from 'moment'
import Receipt from 'Receipt'
import RecipeItem from 'Recipe/RecipeItem'
import ProductItem from 'Product/ProductItem'
import SaveButton from 'OrderSummary/SaveButton'
import SectionHeader from 'SectionHeader'
import css from './OrderSummary.css'
import classnames from 'classnames'
import productUtils from 'utils/products'

class OrderSummary extends React.PureComponent {
	static propTypes = {
		prices: PropTypes.instanceOf(Immutable.Map),
		deliveryDate: PropTypes.string.isRequired,
		deliverySlot: PropTypes.instanceOf(Immutable.Map),
		giftItems: PropTypes.instanceOf(Immutable.Map),
		numPortions: PropTypes.number.isRequired,
		numRecipes: PropTypes.number.isRequired,
		productItems: PropTypes.instanceOf(Immutable.Map),
		products: PropTypes.object.isRequired,
		recipeItems: PropTypes.instanceOf(Immutable.Map),
		recipes: PropTypes.object.isRequired,
		removeProduct: PropTypes.func,
		shippingAddress: PropTypes.instanceOf(Immutable.Map),
		showProductDetail: PropTypes.func,
		saveError: PropTypes.bool,
		saveRequired: PropTypes.bool,
		saving: PropTypes.bool,
		onSave: PropTypes.func.isRequired,
		surcharges: PropTypes.instanceOf(Immutable.List),
		orderNumber: PropTypes.string,
	}

	static defaultProps = {
		giftItems: Immutable.Map(),
		productItems: Immutable.Map(),
		recipeItems: Immutable.Map(),
		prices: Immutable.Map({}),
		orderNumber: '',
	}

	state = {
		orderSummaryOpen: false,
	}

	asterisk = String.fromCharCode(42)

	toggleDetailView = () => {
		this.setState({
			orderSummaryOpen: !this.state.orderSummaryOpen,
		})
	}

	getProducts = () =>
		this.props.productItems.map((productQty, productId) => {
			const product = this.props.products.get(productId, Immutable.Map())

			return {
				orderItemId: productId,
				title: product.get('title'),
				disclaimerKey: product.get('isVatable') ? this.asterisk : '',
				quantity: parseFloat(productQty),
				images: product.get('images'),
				onImageClick: this.props.showProductDetail ? () => { this.props.showProductDetail(productId) } : undefined,
				onRemove: this.props.removeProduct ? () => { this.props.removeProduct(productId) } : undefined,
			}
		}).toArray()


	getProductGifts = () =>
		this.props.giftItems.map((productQty, productId) => {
			const product = this.props.products.get(productId, Immutable.Map())

			// Hide gifts
			if (!productUtils.isNotAGift(product)) {
				return false
			}

			return {
				orderItemId: productId,
				title: product.get('title'),
				quantity: parseFloat(productQty),
				images: product.get('images'),
				gift: true,
			}
		}).toArray().filter(item => item)

	getRecipes = () => {
		const recipes = []

		this.props.recipeItems.forEach((recipeQty, recipeId) => {
			const recipe = this.props.recipes.get(recipeId, Immutable.Map())

			if (recipe.has('title') && recipe.has('media')) {
				recipes.push({
					orderItemId: recipeId,
					title: recipe.get('title'),
					numPortions: parseFloat(recipeQty) * this.props.numPortions,
					media: recipe.get('media'),
					url: recipe.get('url'),
				})
			}
		})

		return recipes
	}

	renderHeader = () =>
		<SectionHeader title="Box summary" type="minorArticle" contentAlign="center">
			<p
				className={classnames(
					css.mobileOnly,
					css.subheader,
					{ [css.mobileHide]: this.state.orderSummaryOpen },
				)}
			>
				Your box will arrive {moment(this.props.deliveryDate).format('dddd, Do MMM')}
			</p>
			<p
				className={classnames(
					css.textblock,
					{ [css.mobileHide]: !this.state.orderSummaryOpen }
				)}
			>
				Here are the details about your box
			</p>
		</SectionHeader>

	renderFooter = () =>
		<footer className={classnames(css.mobileOnly, css.textblock)}>
			{this.state.orderSummaryOpen ?
				<a
					className={css.toggleLink}
					onClick={this.toggleDetailView}
				>
					Hide order details
				</a> :
				<a
					className={css.toggleLink}
					onClick={this.toggleDetailView}
				>
					View order details >
				</a>
			}
		</footer>

	render() {
		const { prices, deliveryDate, deliverySlot, numPortions, numRecipes, shippingAddress, surcharges, productItems, products, orderNumber } = this.props
		let vatableItemsInOrder = false
		let extrasPrice = 0.0
		let totalToPay = prices.get('total') - prices.get('productTotal')

		productItems.forEach((productQty, productId) => {
			const product = products.get(productId, Immutable.Map())

			if (product.get('isVatable')) {
				vatableItemsInOrder = true
			}

			extrasPrice += productQty * parseFloat(product.get('listPrice'))
			totalToPay += productQty * parseFloat(product.get('listPrice'))
		})

		return (
			<section className={css.container}>
				{this.renderHeader()}

				<div
					className={classnames(
						css.details,
						{ [css.slideUp]: !this.state.orderSummaryOpen },
					)}
				>
					{this.getRecipes().map(recipe => <RecipeItem key={recipe.orderItemId} {...recipe} available />)}
					{this.getProducts().map(product => <ProductItem key={product.orderItemId} {...product} available />)}
					{this.getProductGifts().map(product => <ProductItem key={product.orderItemId} {...product} available />)}

					<div className={css.receipt}>
						<Receipt
							prices={prices}
							deliveryDate={deliveryDate}
							deliverySlot={deliverySlot}
							numPortions={numPortions}
							numRecipes={numRecipes}
							deliveryTotalPrice={prices.get('deliveryTotal')}
							shippingAddress={shippingAddress}
							vatableItems={vatableItemsInOrder}
							surcharges={surcharges}
							surchargeTotal={prices.get('surchargeTotal')}
							recipeTotalPrice={prices.get('recipeTotal')}
							totalToPay={String(totalToPay)}
							recipeDiscountAmount={prices.get('recipeDiscount')}
							recipeDiscountPercent={prices.get('percentageOff')}
							extrasTotalPrice={String(extrasPrice)}
							orderNumber={orderNumber}
						>
							{vatableItemsInOrder ? <p className={css.disclaimer}>{this.asterisk} These items include VAT at 20%</p> : null}
						</Receipt>
					</div>
					<SaveButton
						saving={this.props.saving}
						saveRequired={this.props.saveRequired}
						onClick={this.props.onSave}
						error={this.props.saveError}
					/>
				</div>

				{this.renderFooter()}
			</section>
		)
	}
}

export default OrderSummary
