import React from 'react'
import PropTypes from 'prop-types'
import { Product } from '../Product'
import css from './ProductList.css'

const propTypes = {
  products: PropTypes.shape({
    id: PropTypes.string,
  }),
  ageVerified: PropTypes.bool,
  isLimitReached: PropTypes.func,
  toggleAgeVerificationPopUp: PropTypes.func,
}

const ProductListPresentation = ({ products, ageVerified, isLimitReached, toggleAgeVerificationPopUp, ageVerificationPendingId }) => (
  <div className={css.productList}>
    {
      Object.keys(products).map(productKey => {
        const productProps = products[productKey]
        const limitReached = isLimitReached(productProps)

        return (
          <Product
            key={productProps.id}
            product={productProps}
            limitReached={limitReached}
            ageVerified={ageVerified}
            toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
            ageVerificationPendingId={ageVerificationPendingId}
          />)
      })
    }
  </div>
)

ProductListPresentation.propTypes = propTypes

export { ProductListPresentation }
