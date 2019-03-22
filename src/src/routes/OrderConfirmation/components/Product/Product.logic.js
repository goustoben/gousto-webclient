import React, { PureComponent } from 'react'
import { ProductPresentation } from './Product.presentation'

class Product extends PureComponent {
  render() {
    const { images } = this.props
    const imgSource = images && images.first().get('src')
  
    return(
      <ProductPresentation {...this.props} imgSource={imgSource} />
    )
  }
}

export { Product }
