import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {
  CTA,
  LayoutPageWrapper
} from 'goustouicomponents'
import { PageLoader } from 'PageLoader'
import { ProductList } from '../OrderConfirmation/components/ProductList'
import { OrderAddOnsHeader } from './components/OrderAddOnsHeader'
import { OrderAddOnsFooter } from './components/OrderAddOnsFooter'

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
  basketUpdateProducts: PropTypes.func.isRequired,
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

  continueWithoutProducts = () => {
    const { basketReset, orderConfirmationRedirect, orderId } = this.props
    basketReset()
    orderConfirmationRedirect(orderId, 'choice')
  }

  onContinue = async () => {
    const { basket, basketUpdateProducts, orderConfirmationRedirect, orderId } = this.props

    try {
      await basketUpdateProducts()

      if (basket.get('products').size > 0) {
        orderConfirmationRedirect(orderId, 'choice')
      } else {
        this.continueWithoutProducts()
      }
    } catch (err) {
      this.continueWithoutProducts()
    }
  }

  render() {
    const {
      products,
      basket,
      ageVerified,
      productsCategories,
      isPageLoading,
    } = this.props

    const numberOfProducts = Object.keys(products).length
    const selectedProducts = basket.get('products')

    return isPageLoading ? <PageLoader /> : (
      (numberOfProducts > 0) &&
      <div>
        <LayoutPageWrapper>
          <OrderAddOnsHeader
            numberOfProducts={numberOfProducts}
            onClickSkip={this.continueWithoutProducts}
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

        <OrderAddOnsFooter>
          <CTA className="ContinueButton" onClick={this.onContinue}>
            {
              selectedProducts.size ?
                'Continue with items' :
                'Continue without items'
            }
          </CTA>
        </OrderAddOnsFooter>
      </div>
    )
  }
}

OrderAddOns.propTypes = propTypes
OrderAddOns.defaultProps = defaultProps

export {
  OrderAddOns
}
