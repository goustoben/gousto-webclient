import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import css from './OrderConfirmation.css'
import { OrderConfirmationHeader } from './OrderConfirmationHeader'
import { ProductList } from './components/ProductList'

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
            <ProductList
              products={products}
              ageVerified={ageVerified}
              basket={basket}
              productsCategories={productsCategories}
              basketProductAdd={basketProductAdd}
              basketProductRemove={basketProductRemove}
            />
          </section>
        </div>
      </div>
    )
  }
}

OrderConfirmation.propTypes = propTypes

export default OrderConfirmation
