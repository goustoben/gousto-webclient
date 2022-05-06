import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Loading from 'routes/Menu/Loading'
import { getProductLimitReached } from 'utils/basket'
import { ProductListPresentation } from './ProductList.presentation'

const availableNumberOfColumn = {
  2: '',
  4: 'fourColumn',
}

const propTypes = {
  basket: PropTypes.instanceOf(Immutable.Map).isRequired,
  productsCategories: PropTypes.instanceOf(Immutable.Map).isRequired,
  products: PropTypes.shape({
    id: PropTypes.string,
  }),
  ageVerified: PropTypes.bool,
  toggleAgeVerificationPopUp: PropTypes.func.isRequired,
  numberOfColumn: PropTypes.oneOf(Object.keys(availableNumberOfColumn)),
  trackingCategory: PropTypes.string.isRequired,
}

const defaultProps = {
  products: null,
  numberOfColumn: '2',
  ageVerified: false,
}

const ProductList = ({ basket, products, productsCategories, toggleAgeVerificationPopUp, ageVerified, numberOfColumn, trackingCategory }) => {
  const isLimitReached = (product) => {
    const { id } = product
    const limitReachedResult = getProductLimitReached(id, basket, Immutable.fromJS(products), productsCategories)

    return limitReachedResult
  }

  return (
    <div>
      {products ? (
        <ProductListPresentation
          products={products}
          ageVerified={ageVerified}
          isLimitReached={isLimitReached}
          toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
          numberOfColumnClass={availableNumberOfColumn[numberOfColumn]}
          trackingCategory={trackingCategory}
        />
      )
        : <Loading />}
    </div>
  )
}

ProductList.defaultProps = defaultProps
ProductList.propTypes = propTypes

export { ProductList }
