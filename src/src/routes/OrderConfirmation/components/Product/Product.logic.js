import React, { PureComponent } from 'react'
import { AgeVerificationPopUp } from 'Product/AgeVerification/AgeVerificationPopUp'
import { ProductPresentation } from './Product.presentation'
import css from './Product.css'

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
    const { product, ageVerified, ageRestricted, basketProductAdd, limitReached } = this.props
    const { id } = product
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
    const { ageVerified, product, limitReached } = this.props
    const { id, title, listPrice, images, ageRestricted, quantity} = product

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

export { Product }
