import React, { PureComponent } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import Overlay from 'Overlay'
import configProducts from 'config/products'
import ProductDetailContainer from '../ProductDetails'
import { ProductPresentation } from './Product.presentation'
import css from './Product.module.css'

const propTypes = {
  basket: PropTypes.instanceOf(Immutable.Map),
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    listPrice: PropTypes.string,
    images: PropTypes.object,
    ageRestricted: PropTypes.bool,
    quantity: PropTypes.number,
    stock: PropTypes.number,
  }).isRequired,
  limitReached: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      value: PropTypes.string,
      type: PropTypes.string,
    })
  ]),
  ageVerified: PropTypes.bool,
  ageVerificationPendingId: PropTypes.string,
  ageVerificationPending: PropTypes.bool,
  basketProductAdd: PropTypes.func,
  basketProductRemove: PropTypes.func,
  numberOfColumnClass: PropTypes.string,
  temp: PropTypes.func,
  orderConfirmationProductTracking: PropTypes.func,
  isSelectedProduct: PropTypes.bool,
  addProduct: PropTypes.bool,
  toggleAgeVerificationPopUp: PropTypes.func,
  productId: PropTypes.string,
}

class Product extends PureComponent {
  constructor() {
    super()
    this.state = {
      showDetailsScreen: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { ageVerified, isSelectedProduct, addProduct, product, basketProductAdd } = this.props
    const ageVerifiedChanged = !Object.is(ageVerified, prevProps.ageVerified)

    if (isSelectedProduct && ageVerified && ageVerifiedChanged) {
      if (addProduct) {
        basketProductAdd(product.id)
      } else {
        this.toggleModal()
      }
    }
  }

  toggleDetailsVisibility = () => {
    this.setState((prevState) => ({
      showDetailsScreen: !prevState.showDetailsScreen
    }))
  }

  toggleModal = () => {
    const { toggleAgeVerificationPopUp, product, temp } = this.props
    if (this.isAgeVerificationRequired()) {
      toggleAgeVerificationPopUp()
      temp('productId', product.id)
      temp('addProduct', false)
    } else {
      this.toggleDetailsVisibility()
    }
  }

  isAgeVerificationRequired = () => {
    const { product, ageVerified } = this.props
    const { ageRestricted } = product

    return !ageVerified && ageRestricted
  }

  onAddProduct = () => {
    const { product, basketProductAdd, limitReached, toggleAgeVerificationPopUp, temp, orderConfirmationProductTracking } = this.props
    const { id } = product
    const isAgeVerificationRequired = this.isAgeVerificationRequired()
    if (!limitReached) {
      if (isAgeVerificationRequired) {
        toggleAgeVerificationPopUp()
        temp('productId', id)
        temp('addProduct', true)
      } else {
        basketProductAdd(id)
        orderConfirmationProductTracking(id, true)
      }
    }
  }

  onRemoveProduct = () => {
    const { product, basketProductRemove, orderConfirmationProductTracking } = this.props
    const { id } = product
    basketProductRemove(id)
    orderConfirmationProductTracking(id, false)
  }

  getProductCardContent = () => {
    const { ageVerified, product, basket, limitReached, ageVerificationPending, productId } = this.props
    const { id, title, listPrice, images, ageRestricted, stock } = product
    const quantity = basket && basket.get('products').has(id) ? basket.getIn(['products', id]) : 0

    const imgSource = images && images['400'] && images['400'].src
    const isAgeVerificationRequired = !ageVerified && ageRestricted
    const lowStock = (stock <= configProducts.lowStockThreshold)
    const outOfStock = stock <= 0

    const inProgress = ageVerificationPending && id === productId

    return {
      id,
      title,
      lowStock,
      outOfStock,
      listPrice,
      imgSource,
      limitReached,
      isAgeVerificationRequired,
      ageVerificationPending,
      qty: quantity,
      openDetailsScreen: this.toggleModal,
      inProgress
    }
  }

  getProductDetails = () => {
    const { product } = this.props

    return {
      ...product,
      showPopUp: true,
      onVisibilityChange: this.toggleModal,
    }
  }

  render() {
    const { showDetailsScreen } = this.state
    const { toggleAgeVerificationPopUp, numberOfColumnClass } = this.props
    const productCardContent = this.getProductCardContent()
    const productDetails = this.getProductDetails()

    return (
      <section className={`${css.productWrapper} ${css[numberOfColumnClass]}`}>
        <ProductPresentation
          onAdd={this.onAddProduct}
          onRemove={this.onRemoveProduct}
          toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
          {...productCardContent}
        />
        <Overlay open={showDetailsScreen} onClose={this.toggleDetailsVisibility}>
          <ProductDetailContainer
            {...productDetails}
            onAdd={this.onAddProduct}
            onRemove={this.onRemoveProduct}
          />
        </Overlay>
      </section>
    )
  }
}

Product.propTypes = propTypes

export { Product }
