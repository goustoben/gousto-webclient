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
  numberOfColumnClass: PropTypes.string,
}

const ProductListPresentation = ({ products, ageVerified, isLimitReached, toggleAgeVerificationPopUp, numberOfColumnClass }) => (
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
            numberOfColumnClass={numberOfColumnClass}
            toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
          />)
      })
    }
  </div>
)

ProductListPresentation.propTypes = propTypes

export { ProductListPresentation }
