import React, { PureComponent } from 'react'
import { ProductPresentation } from './Product.presentation'

class Product extends PureComponent {
  render() {
    const { images } = this.props
    const imgSource = images && images['400']['src']
  
    return(
      <ProductPresentation {...this.props} imgSource={imgSource} />
    )
  }
}

export { Product }
