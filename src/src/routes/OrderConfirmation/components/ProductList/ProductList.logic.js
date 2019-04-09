import React, { PureComponent } from 'react'
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

class ProductList extends PureComponent {

  isLimitReached = (product) => {
    const { basket, productsCategories, products } = this.props
    const { id } = product
    const limitReachedResult = getProductLimitReached(id, basket, Immutable.fromJS(products), productsCategories)

    return limitReachedResult
  }

  getChosenCategoryProducts = (chosenCategory) => {
    const { products, productsFilteredByCategory } = this.props

    const chosenCategoryProducts = Object.keys(products).reduce((categoryProducts, productKey) => {
      const productProps = products[productKey]
      const productCategory = productProps.categories[0].title
      chosenCategory == productCategory ? categoryProducts.push(productProps) : null

      return categoryProducts
    }, [])

    productsFilteredByCategory(chosenCategoryProducts)
  }

  render() {
    const { products, ageVerified, toggleAgeVerificationPopUp, filteredProducts } = this.props
    const productsToRender = filteredProducts ? filteredProducts : products

    return (
      <div>
        {!!products ? <ProductListPresentation
          products={productsToRender}
          ageVerified={ageVerified}
          isLimitReached={this.isLimitReached}
          toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
          getChosenCategoryProducts={this.getChosenCategoryProducts}
        /> :
          <Loading />
        }
      </div>
    )
  }

}

ProductList.propTypes = propTypes
export { ProductList }
