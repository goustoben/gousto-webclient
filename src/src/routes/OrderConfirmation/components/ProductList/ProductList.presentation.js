import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { Product } from '../Product'
import css from './ProductList.css'

const propTypes = {
  basket: PropTypes.instanceOf(Immutable.Map),
  productsCategories: PropTypes.instanceOf(Immutable.Map),
  products: PropTypes.shape({
    id: PropTypes.string,
  }),
  ageVerified: PropTypes.bool,
  basketProductAdd: PropTypes.func,
  basketProductRemove: PropTypes.func,
  isLimitReached: PropTypes.func,
}

const ProductListPresentation = ({ products, basket, productsCategories, ageVerified, basketProductAdd, basketProductRemove, isLimitReached }) => (
  <div className={css.productList}>
    {
      Object.keys(products).map(productKey => {
        const productProps = products[productKey]
        const limitReached = isLimitReached(productProps)

        return (
          <Product
            key={productProps.id}
            basket={basket}
            product={productProps}
            limitReached={limitReached}
            productsCategories={productsCategories}
            ageVerified={ageVerified}
            basketProductAdd={basketProductAdd}
            basketProductRemove={basketProductRemove}
          />)
      })
    }
  </div>
)

ProductListPresentation.propTypes = propTypes

export { ProductListPresentation }
