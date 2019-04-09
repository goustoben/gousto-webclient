import React from 'react'
import PropTypes from 'prop-types'
import { Product } from '../Product'
import { Navbar } from '../Navbar'
import css from './ProductList.css'

const propTypes = {
  products: PropTypes.shape({
    id: PropTypes.string,
  }),
  ageVerified: PropTypes.bool,
  isLimitReached: PropTypes.func,
  toggleAgeVerificationPopUp: PropTypes.func,
}

const ProductListPresentation = ({ products, ageVerified, isLimitReached, toggleAgeVerificationPopUp }) => (
  <div className={css.productList}>
    <Navbar items={items} onClick={getChosenCategoryProducts}/>
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
          />)
      })
    }
  </div>
)

ProductListPresentation.propTypes = propTypes

export { ProductListPresentation }
