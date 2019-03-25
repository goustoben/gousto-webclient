import React, { PureComponent } from 'react'
import { AgeVerificationPopUp } from 'Product/AgeVerification/AgeVerificationPopUp'
import { ProductPresentation } from './Product.presentation'
import css from './Product.css'

class Product extends PureComponent {
  constructor() {
    super()
    this.state = {
      showAgeVerification: false
    }
  }
  closePopUp = () => {
    this.setState({
      showAgeVerification: false
    })
  }

  onAddProduct = (productId) => {
    const { ageVerified, ageRestricted } = this.props
    const ageVerificationRequired = !ageVerified && ageRestricted

    if(ageVerificationRequired) {
      this.setState({
        showAgeVerification: true
      })
    }
  }

  render() {
    const { images, ageVerified, ageRestricted } = this.props
    const imgSource = images && images['400']['src']
    const ageVerificationRequired = !ageVerified && ageRestricted
    const { showAgeVerification } = this.state

    return(
      <div className={css.productCardContainer}>
        <ProductPresentation onAdd={this.onAddProduct} {...this.props} imgSource={imgSource} ageVerificationRequired={ageVerificationRequired} />
        <AgeVerificationPopUp visible={showAgeVerification} close={this.closePopUp} />
      </div>
    )
  }
}

export { Product }
