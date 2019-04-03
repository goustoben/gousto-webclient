import React, { PureComponent } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import Overlay from 'Overlay'
import { AgeVerificationPopUp } from 'Product/AgeVerification'
import ProductDetailContainer from '../ProductDetails'
import { ProductPresentation } from './Product.presentation'
import css from './Product.css'

const propTypes = {
  basket: PropTypes.instanceOf(Immutable.Map()),
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    listPrice: PropTypes.string,
    images: PropTypes.array,
    ageRestricted: PropTypes.bool,
    quantity: PropTypes.number,
  }).isRequired,
  limitReached: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      value: PropTypes.string,
      type: PropTypes.string,
    })
  ]),
  productsCategories: PropTypes.instanceOf(Immutable.List),
  ageVerified: PropTypes.bool,
  basketProductAdd: PropTypes.func,
  basketProductRemove: PropTypes.func,
}

class Product extends PureComponent {
  constructor() {
    super()
    this.state = {
      showAgeVerification: false,
      showDetailsScreen: false,
    }
  }

  toggleAgeVerificationPopUp = () => {
    this.setState((prevState) => ({
      showAgeVerification: !prevState.showAgeVerification
    }))
  }

  onAddProduct = () => {
    const { product, ageVerified, basketProductAdd, limitReached } = this.props
    const { id, ageRestricted} = product
    const isAgeVerificationRequired = !ageVerified && ageRestricted
    if(isAgeVerificationRequired) {
      this.toggleAgeVerificationPopUp()
    }
    
    if(!limitReached) {
      basketProductAdd(id)
    }
  }

  onRemoveProduct = () => {
    const { product, basketProductRemove } = this.props
    const { id } = product
    basketProductRemove(id)
  }

  toggleDetailsVisibility = () => {
    this.setState((prevState) => ({
      showDetailsScreen: !prevState.showDetailsScreen
    }))
  }

  getProductCardContent = () => {
    const { ageVerified, product, basket, limitReached } = this.props
    const { id, title, listPrice, images, ageRestricted} = product
    const quantity = basket && basket.get('products').has(product.id) ? basket.getIn(['products', product.id]) : 0

    const imgSource = images && images['400']['src']
    const isAgeVerificationRequired = !ageVerified && ageRestricted

    return {
      id,
      title,
      listPrice,
      imgSource: imgSource,
      isAgeVerificationRequired,
      qty: quantity,
      limitReached,
      openDetailsScreen: this.toggleDetailsVisibility,
    }
  }
  getProductDetails = () => {
    const { product } = this.props

    return {
      product,
      showPopUp: true,
      onVisibilityChange: this.toggleDetailsVisibility,
    }
  }

  render() {
    const { showAgeVerification, showDetailsScreen } = this.state
    const productCardContent = this.getProductCardContent()
    const productDetails = this.getProductDetails()

    return(
      <section className={css.productWrapper}>
        <ProductPresentation
          onAdd={this.onAddProduct}
          onRemove={this.onRemoveProduct}
          {...productCardContent}
        />
        <AgeVerificationPopUp isVisible={showAgeVerification} onClose={this.toggleAgeVerificationPopUp} />
        <Overlay open={showDetailsScreen} onClose={this.toggleDetailsVisibility} >
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

PropTypes.propTypes = propTypes

export { Product }
