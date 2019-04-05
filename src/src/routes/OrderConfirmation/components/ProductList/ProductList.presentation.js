import React from 'react'
import { Product } from '../Product'
import css from './ProductList.css'

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

export { ProductListPresentation }
