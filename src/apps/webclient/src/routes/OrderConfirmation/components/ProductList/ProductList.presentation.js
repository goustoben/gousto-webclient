import React from 'react'

import PropTypes from 'prop-types'

import { Product } from '../Product'

import css from './ProductList.css'

const propTypes = {
  products: PropTypes.shape({
    id: PropTypes.string,
  }),
  ageVerified: PropTypes.bool,
  isLimitReached: PropTypes.func.isRequired,
  toggleAgeVerificationPopUp: PropTypes.func.isRequired,
  numberOfColumnClass: PropTypes.string,
  trackingCategory: PropTypes.string.isRequired,
}

const defaultProps = {
  products: null,
  numberOfColumnClass: '',
  ageVerified: false,
}

const ProductListPresentation = ({
  products,
  ageVerified,
  isLimitReached,
  toggleAgeVerificationPopUp,
  numberOfColumnClass,
  trackingCategory,
}) => (
  <div className={css.productList}>
    {Object.keys(products).map((productKey) => {
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
          category={trackingCategory}
        />
      )
    })}
  </div>
)

ProductListPresentation.propTypes = propTypes

ProductListPresentation.defaultProps = defaultProps

export { ProductListPresentation }
