import React from 'react'
import { ProductPresentation } from './Product.presentation'

const Product = (props) => {
  const { images } = props
  const imgSource = images && images['400']['src']

  return(
    <ProductPresentation {...props} imgSource={imgSource} />
  )
}

export { Product }
