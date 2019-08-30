import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import moment from 'moment'
import Receipt from 'Receipt'
import RecipeItem from 'Recipe/RecipeItem'
import ProductItem from 'Product/ProductItem'
import SaveButton from 'OrderSummary/SaveButton'
import SectionHeader from 'SectionHeader'
import classnames from 'classnames'
import productUtils from 'utils/products'
import css from './OrderSummary.css'

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
    orderSummaryCollapsed: PropTypes.bool,
    isOrderConfirmation: PropTypes.bool,
  }

  static defaultProps = {
    giftItems: Immutable.Map(),
    productItems: Immutable.Map(),
    recipeItems: Immutable.Map(),
    prices: Immutable.Map({}),
    orderNumber: '',
    orderSummaryCollapsed: true,
    isOrderConfirmation: false,
  }

  state = {
    orderSummaryOpen: false,
  }

  asterisk = String.fromCharCode(42)
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

  renderHeader = () => {
    const { orderSummaryOpen } = this.state
    const { deliveryDate, sectionTitle } = this.props

    return (
      <SectionHeader title={sectionTitle ? sectionTitle : "Box summary"} type="minorArticle">
        <p
          className={classnames(
            css.mobileOnly,
            css.textblock,
            { [css.mobileHide]: orderSummaryOpen },
          )}
        >
          Your box will arrive {moment(deliveryDate).format('dddd, Do MMMM')}
        </p>
        <p
          className={classnames(
            css.textblock,
            { [css.mobileHide]: !orderSummaryOpen }
          )}
        >
          Here&#39;s what&#39;s inside your box
        </p>
      </SectionHeader>
    )
  }

  renderFooter = () => {
    const { orderSummaryOpen } = this.state

    return (
      <footer className={classnames(css.mobileOnly, css.footer)}>
        {orderSummaryOpen ?
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
      onOrderConfirmationMobile
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
        {this.renderHeader()}

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
              {vatableItemsInOrder ? <p className={css.disclaimer}>{this.asterisk} These items include VAT at 20%</p> : null}
            </Receipt>
          </div>
          <div className={classnames({ [css.updateOrderButtonSummary]: onOrderConfirmationMobile })}>
            <SaveButton
              saving={saving}
              saveRequired={saveRequired}
              onClick={this.onOrderSave}
              error={saveError}
            />
          </div>
        </div>

        {orderSummaryCollapsed && this.renderFooter()}
      </section>
    )
  }
}

export default OrderSummary
