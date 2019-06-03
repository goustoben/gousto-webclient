import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Loading from 'routes/Menu/Loading'
import { getProductLimitReached } from 'utils/basket'
import { ProductListPresentation } from './ProductList.presentation'

const propTypes = {
  basket: PropTypes.instanceOf(Immutable.Map),
  productsCategories: PropTypes.instanceOf(Immutable.Map),
  products: PropTypes.shape({
    id: PropTypes.string,
  }),
  ageVerified: PropTypes.bool,
  toggleAgeVerificationPopUp: PropTypes.func
}

const ProductList = ({ basket, products, productsCategories, toggleAgeVerificationPopUp, ageVerified, ageVerificationPendingId }) => {

  const isLimitReached = (product) => {
    const { id } = product
    const limitReachedResult = getProductLimitReached(id, basket, Immutable.fromJS(products), productsCategories)

    return limitReachedResult
  }

  return (
    <div>
      {!!products ? <ProductListPresentation
        products={products}
        ageVerified={ageVerified}
        isLimitReached={isLimitReached}
        toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
        ageVerificationPendingId={ageVerificationPendingId}
      /> :
        <Loading />
      }
    </div>
  )
}

ProductList.propTypes = propTypes
export { ProductList }
