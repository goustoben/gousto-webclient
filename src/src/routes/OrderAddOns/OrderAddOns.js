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
  basketProductsCost: PropTypes.string,
  productsCategories: PropTypes.instanceOf(Immutable.Map).isRequired,
  orderConfirmationRedirect: PropTypes.func.isRequired,
  basketUpdateProducts: PropTypes.func.isRequired,
  basketReset: PropTypes.func.isRequired,
  isPageLoading: PropTypes.bool,
  orderAction: PropTypes.string,
}

const defaultProps = {
  basketProductsCost: '0.00',
  isPageLoading: false,
  orderAction: '',
}

class OrderAddOns extends React.Component {
  componentDidMount() {
    const { orderDetails, orderId } = this.props

    orderDetails(orderId)
  }

  continueWithoutProducts = () => {
    const {
      basketReset,
      orderAction,
      orderConfirmationRedirect,
      orderId,
    } = this.props
    basketReset()
    orderConfirmationRedirect(orderId, orderAction)
  }

  onContinue = async () => {
    const {
      basket,
      basketUpdateProducts,
      orderAction,
      orderConfirmationRedirect,
      orderId,
    } = this.props

    try {
      await basketUpdateProducts()

      if (basket.get('products').size > 0) {
        orderConfirmationRedirect(orderId, orderAction)
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
      basketProductsCost,
      ageVerified,
      productsCategories,
      isPageLoading,
    } = this.props

    const numberOfProducts = Object.keys(products).length
    const areProductsSelected = basket.get('products').size
    const formattedProductsCost = `+£${basketProductsCost}`

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
          <CTA
            className="ContinueButton"
            extraInfo={areProductsSelected ? formattedProductsCost : null}
            isFullWidth
            onClick={this.onContinue}
          >
            {`Continue ${areProductsSelected ? 'with' : 'without'} items`}
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
