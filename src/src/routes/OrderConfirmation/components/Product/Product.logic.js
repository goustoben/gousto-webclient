import React, { PureComponent } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { AgeVerificationPopUp } from 'Product/AgeVerification'
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
    }
  }

  closePopUp = () => {
    this.setState({
      showAgeVerification: false
    })
  }

  onAddProduct = () => {
    const { product, ageVerified, basketProductAdd, limitReached } = this.props
    const { id, ageRestricted} = product
    const ageVerificationRequired = !ageVerified && ageRestricted
    if(ageVerificationRequired) {
      this.setState({
        showAgeVerification: true
      })
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

  getProductDetails = () => {
    const { ageVerified, product, basket, limitReached } = this.props
    const { id, title, listPrice, images, ageRestricted} = product
    const quantity = basket && basket.get('products').has(product.id) ? basket.getIn(['products', product.id]) : 0

    const imgSource = images && images['400']['src']
    const ageVerificationRequired = !ageVerified && ageRestricted

    return {
      id,
      title,
      listPrice,
      imgSource: imgSource,
      ageVerificationRequired,
      qty: quantity,
      limitReached,
    }
  }

  render() {
    const { showAgeVerification } = this.state
    const productDetails = this.getProductDetails()

    return(
      <div className={css.productCardContainer}>
        <ProductPresentation
          onAdd={this.onAddProduct}
          onRemove={this.onRemoveProduct}
          {...productDetails}
        />
        <AgeVerificationPopUp visible={showAgeVerification} close={this.closePopUp} />
      </div>
    )
  }
}

PropTypes.propTypes = propTypes

export { Product }
