import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React, { PureComponent } from 'react'
import Immutable from 'immutable'
import Receipt from 'Receipt'
import Icon from 'Icon'

import RecipeItem from 'routes/Menu/Recipe/RecipeItem'
import ProductItem from 'Product/ProductItem'
import SaveButton from 'OrderSummary/SaveButton'
import classnames from 'classnames'
import productUtils from 'utils/products'
import { UserCreditMessage } from 'components/UserCreditMessage'
import css from './OrderSummary.css'

const propTypes = {
  prices: ImmutablePropTypes.map,
  deliveryDate: PropTypes.string.isRequired,
  deliverySlot: PropTypes.instanceOf(Immutable.Map),
  giftItems: PropTypes.instanceOf(Immutable.Map),
  numPortions: PropTypes.number.isRequired,
  numRecipes: PropTypes.number.isRequired,
  productItems: PropTypes.instanceOf(Immutable.Map),
  products: ImmutablePropTypes.map.isRequired,
  recipeItems: PropTypes.instanceOf(Immutable.Map),
  recipes: ImmutablePropTypes.map.isRequired,
  removeProduct: PropTypes.func,
  shippingAddress: ImmutablePropTypes.map,
  showProductDetail: PropTypes.func,
  saveError: PropTypes.bool,
  saveRequired: PropTypes.bool,
  saving: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  surcharges: PropTypes.instanceOf(Immutable.List),
  orderNumber: PropTypes.string,
  orderSummaryCollapsed: PropTypes.bool,
  isOrderConfirmation: PropTypes.bool.isRequired,
  onOrderConfirmationMobile: PropTypes.bool.isRequired,
}

const defaultProps = {
  prices: Immutable.Map({}),
  deliverySlot: Immutable.Map(),
  giftItems: Immutable.Map(),
  productItems: Immutable.Map(),
  recipeItems: Immutable.Map(),
  removeProduct: null,
  shippingAddress: Immutable.Map(),
  showProductDetail: null,
  saveError: false,
  saveRequired: false,
  saving: false,
  surcharges: Immutable.List(),
  orderNumber: '',
  orderSummaryCollapsed: true,
}

class OrderSummary extends PureComponent {
  asterisk = String.fromCharCode(42)

  constructor(props) {
    super(props)
    this.state = {
      orderSummaryOpen: false,
    }
  }

  onOrderSave = () => {
    const { isOrderConfirmation, onSave } = this.props
    onSave(isOrderConfirmation)
  }

  toggleDetailView = () => {
    const { orderSummaryOpen } = this.state
    this.setState({
      orderSummaryOpen: !orderSummaryOpen,
    })
  }

  getProducts = () => {
    const { productItems, products, showProductDetail, removeProduct } = this.props

    return (
      productItems.map((productQty, productId) => {
        const product = products.get(productId, Immutable.Map())

        return {
          orderItemId: productId,
          title: product.get('title'),
          disclaimerKey: product.get('isVatable') ? this.asterisk : '',
          quantity: parseFloat(productQty),
          images: product.get('images'),
          onImageClick: showProductDetail ? () => { showProductDetail(productId) } : undefined,
          onRemove: removeProduct ? () => { removeProduct(productId) } : undefined,
        }
      }).toArray()
    )
  }

  getProductGifts = () => {
    const { giftItems, products } = this.props

    return giftItems.map((productQty, productId) => {
      const product = products.get(productId, Immutable.Map())

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
  }

  getRecipes = () => {
    const { recipeItems, recipes, numPortions } = this.props
    const recipesDetails = []

    recipeItems.forEach((recipeQty, recipeId) => {
      const recipe = recipes.get(recipeId, Immutable.Map())

      if (recipe.has('title') && recipe.has('media')) {
        recipesDetails.push({
          orderItemId: recipeId,
          title: recipe.get('title'),
          numPortions: parseFloat(recipeQty) * numPortions,
          media: recipe.get('media'),
          url: recipe.get('url'),
        })
      }
    })

    return recipesDetails
  }

  renderFooter = () => {
    const { orderSummaryOpen } = this.state

    return (
      <footer className={classnames(css.mobileOnly, css.footer)}>
        {orderSummaryOpen ? (
          <a
            className={css.toggleLink}
            onClick={this.toggleDetailView}
          >
            Hide order details
            <Icon name="fa-angle-up" className={css.footerIcon} />
          </a>
        ) : (
          <a
            className={css.toggleLink}
            onClick={this.toggleDetailView}
          >
            View order details
            <Icon name="fa-angle-down" className={css.footerIcon} />
          </a>
        )}
      </footer>
    )
  }

  render() {
    const {
      prices,
      deliveryDate,
      deliverySlot,
      numPortions,
      numRecipes,
      shippingAddress,
      surcharges,
      productItems,
      products,
      orderNumber,
      saving,
      saveRequired,
      saveError,
      orderSummaryCollapsed,
      onOrderConfirmationMobile,
    } = this.props
    const { orderSummaryOpen } = this.state
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

        <div
          className={classnames(
            css.details,
            { [css.slideUp]: (!orderSummaryOpen && orderSummaryCollapsed) },
            { [css.mobileHide]: !orderSummaryOpen && orderSummaryCollapsed }
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
              {vatableItemsInOrder ? (
                <p className={css.disclaimer}>
                  {this.asterisk}
                  {' '}
                  These items include VAT at 20%
                </p>
              ) : null}
            </Receipt>
          </div>
          <UserCreditMessage />
          <div className={classnames({ [css.updateOrderButtonSummary]: onOrderConfirmationMobile })}>
            <SaveButton
              saving={saving}
              saveRequired={saveRequired}
              onClick={this.onOrderSave}
              error={saveError}
            />
          </div>
        </div>
        {orderSummaryCollapsed ? this.renderFooter() : null}
      </section>
    )
  }
}

OrderSummary.propTypes = propTypes

OrderSummary.defaultProps = defaultProps

export default OrderSummary
