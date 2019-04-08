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
  basketProductAdd: PropTypes.func,
  basketProductRemove: PropTypes.func,
}

class ProductList extends PureComponent {
  isLimitReached = (product) => {
    const { basket, productsCategories, products } = this.props
    const { id } = product
    const limitReachedResult = getProductLimitReached(id, basket, Immutable.fromJS(products), productsCategories)

    return limitReachedResult
  }

  render () {
    const { products, basket, productsCategories, ageVerified, basketProductAdd, basketProductRemove } = this.props

    return(
      <div>
        {!!products ? <ProductListPresentation
          products={products}
          ageVerified={ageVerified}
          basket={basket}
          productsCategories={productsCategories}
          isLimitReached={this.isLimitReached}
          basketProductAdd={basketProductAdd}
          basketProductRemove={basketProductRemove}
        /> : 
        <Loading />
        }
      </div>
    )
  }
  
}

ProductList.propTypes = propTypes
export { ProductList }
