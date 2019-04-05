import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { getProductLimitReached } from 'utils/basket'
import css from './OrderConfirmation.css'
import { OrderConfirmationHeader } from './OrderConfirmationHeader'
import { Product } from './components/Product/Product.logic'

const propTypes = {
  showHeader: PropTypes.bool,
  headerDetails: PropTypes.oneOfType([
    PropTypes.shape({
      deliveryDate: PropTypes.string,
      deliveryStart: PropTypes.string,
      deliveryEnd: PropTypes.string,
      whenCutoffTime: PropTypes.string,
      whenCutoffDate: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  basket: PropTypes.instanceOf(Immutable.Map),
  productsCategories: PropTypes.instanceOf(Immutable.Map),
  products: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    listPrice: PropTypes.string,
    images: PropTypes.array,
    ageRestricted: PropTypes.bool,
    quantity: PropTypes.number,
  }),
  ageVerified: PropTypes.bool,
  basketProductAdd: PropTypes.func,
  basketProductRemove: PropTypes.func,
}
  isLimitReached = (product) => {
    const { basket, productsCategories, products } = this.props
    const { id } = product
    const limitReachedResult = getProductLimitReached(id, basket, Immutable.fromJS(products), productsCategories)

    return limitReachedResult
  }
class OrderConfirmation extends PureComponent {

  render() {
    const {
      headerDetails,
      showHeader,
      products,
      ageVerified,
      basket,
      productsCategories,
      basketProductAdd,
      basketProductRemove,
    } = this.props

    return (
      <div>
        {showHeader && <OrderConfirmationHeader
          {...headerDetails}
        />}
        <div className={css.marketPlacetWrapper}>
          <h3 className={css.marketPlaceTitle}>The Gousto Market</h3>
          <section className={css.marketPlaceContent}>
            <div className={css.productList}>
              {!!products && Object.keys(products).map(productKey => {
                const productProps = products[productKey]
                const limitReached = this.isLimitReached(productProps)

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
              })}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

OrderConfirmation.propTypes = propTypes

export default OrderConfirmation
