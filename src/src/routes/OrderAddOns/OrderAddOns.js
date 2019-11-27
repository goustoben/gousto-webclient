import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {
  LayoutPageWrapper
} from 'goustouicomponents'
import { ProductList } from '../OrderConfirmation/components/ProductList'

const propTypes = {
  orderDetails: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  products: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      listPrice: PropTypes.string,
      images: PropTypes.object,
      ageRestricted: PropTypes.bool,
      quantity: PropTypes.number,
    })
  ).isRequired,
  ageVerified: PropTypes.bool,
  basket: PropTypes.instanceOf(Immutable.Map).isRequired,
  productsCategories: PropTypes.instanceOf(Immutable.Map).isRequired,
}

class OrderAddOns extends React.Component {
  componentDidMount() {
    const { orderDetails, orderId } = this.props

    orderDetails(orderId)
  }

  render() {
    const { products, basket, ageVerified, productsCategories } = this.props

    return (
      (Object.keys(products).length > 0) &&
      <LayoutPageWrapper>
        <ProductList
          products={products}
          basket={basket}
          ageVerified={ageVerified}
          productsCategories={productsCategories}
          toggleAgeVerificationPopUp={() => {}}
          numberOfColumn="4"
        />
      </LayoutPageWrapper>
    )
  }
}

OrderAddOns.propTypes = propTypes

export {
  OrderAddOns
}
