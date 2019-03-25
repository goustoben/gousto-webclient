import React, { Component } from 'react'
import css from './OrderConfirmation.css'
import { OrderConfirmationHeader } from './OrderConfirmationHeader'
import { Product } from './components/Product/Product.logic'
import { getHeaderDetails } from './helper'

class OrderConfirmation extends Component {

  render() {
    const { order, showHeader, products, ageVerified } = this.props
    const headerDetails = order && getHeaderDetails(order)

    return (
      <div>
        {showHeader && <OrderConfirmationHeader
          {...headerDetails}
        />}
        <div className={css.marketPlacetWrapper}>
          <h3 className={css.marketPlaceTitle}>The Gousto Market</h3>
          <div className={css.productList}>
           {products ? Object.keys(products).map(productKey => {
             const productProps = products[productKey]
              
             return <Product key={productProps.id} {...productProps} ageVerified={ageVerified}/>
           }): null
           }
          </div>
        </div>
      </div>
    )
  }
}

export default OrderConfirmation
