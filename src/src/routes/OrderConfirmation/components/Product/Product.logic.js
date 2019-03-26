import React, { PureComponent } from 'react'
import { AgeVerificationPopUp } from 'Product/AgeVerification/AgeVerificationPopUp'
import { ProductPresentation } from './Product.presentation'
import css from './Product.css'

class Product extends PureComponent {
  constructor() {
    super()
    this.state = {
      showAgeVerification: false,
      qty: 0,
    }
  }
  closePopUp = () => {
    this.setState({
      showAgeVerification: false
    })
  }

  onAddProduct = () => {
    const { ageVerified, ageRestricted } = this.props
    const ageVerificationRequired = !ageVerified && ageRestricted

    if(ageVerificationRequired) {
      this.setState({
        showAgeVerification: true
      })
    }
    this.setState(prevState => ({ qty: prevState.qty + 1 }))
   
  }

  onRemoveProduct = () => {
    this.setState(prevState => ({ qty: prevState.qty - 1 }))
  }

  render() {
    const { images, ageVerified, ageRestricted } = this.props
    const imgSource = images && images['400']['src']
    const ageVerificationRequired = !ageVerified && ageRestricted
    const { showAgeVerification, qty } = this.state

    return(
      <div className={css.productCardContainer}>
        <ProductPresentation
          onAdd={this.onAddProduct}
          onRemove={this.onRemoveProduct}
          imgSource={imgSource}
          ageVerificationRequired={ageVerificationRequired}
          qty={qty}
          {...this.props}
        />
        <AgeVerificationPopUp visible={showAgeVerification} close={this.closePopUp} />
      </div>
    )
  }
}

export { Product }
