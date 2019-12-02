import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {
  LayoutPageWrapper
} from 'goustouicomponents'
import { PageLoader } from 'PageLoader'
import { ProductList } from '../OrderConfirmation/components/ProductList'
import { OrderAddOnsHeader } from './components/OrderAddOnsHeader'

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
  orderConfirmationRedirect: PropTypes.func.isRequired,
  basketReset: PropTypes.func.isRequired,
  isPageLoading: PropTypes.bool,
}

const defaultProps = {
  isPageLoading: false,
}

class OrderAddOns extends React.Component {
  componentDidMount() {
    const { orderDetails, orderId } = this.props

    orderDetails(orderId)
  }

  render() {
    const {
      products,
      basket,
      ageVerified,
      productsCategories,
      orderId,
      orderConfirmationRedirect,
      basketReset,
      isPageLoading,
    } = this.props

    const numberOfProducts = Object.keys(products).length

    return isPageLoading ? <PageLoader /> : (
      (numberOfProducts > 0) &&
      <LayoutPageWrapper>
        <OrderAddOnsHeader
          numberOfProducts={numberOfProducts}
          onClickSkip={() => {
            basketReset()
            orderConfirmationRedirect(orderId, 'choice')
          }}
        />
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
OrderAddOns.defaultProps = defaultProps

export {
  OrderAddOns
}
