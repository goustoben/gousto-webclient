import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { formatPrice, formatLabelPlural, formatDashOrPrice, formatDeliveryTotal, formatRecipeDiscount } from 'utils/format'
import { formatOrderPrice } from 'utils/pricing'

import css from './Receipt.module.css'
import { ReceiptLine } from './ReceiptLine'
import { DeliveryDetails } from './DeliveryDetails'

const propTypes = {
  prices: PropTypes.instanceOf(Immutable.Map),
  children: PropTypes.node,
  numRecipes: PropTypes.number,
  deliveryTotalPrice: PropTypes.string,
  shippingAddress: PropTypes.instanceOf(Immutable.Map),
  deliveryDate: PropTypes.string,
  deliverySlot: PropTypes.instanceOf(Immutable.Map),
  surcharges: PropTypes.instanceOf(Immutable.List),
  surchargeTotal: PropTypes.string,
  totalToPay: PropTypes.string,
  recipeTotalPrice: PropTypes.string,
  recipeDiscountAmount: PropTypes.string,
  recipeDiscountPercent: PropTypes.string,
  extrasTotalPrice: PropTypes.string,
  showTitleSection: PropTypes.bool,
  orderNumber: PropTypes.string,
  isReceiptInCheckout: PropTypes.bool,
  isGoustoOnDemandEnabled: PropTypes.bool,
}

const defaultProps = {
  prices: Immutable.Map({}),
  children: null,
  numRecipes: 0,
  deliveryTotalPrice: '',
  shippingAddress: null,
  deliveryDate: null,
  deliverySlot: Immutable.Map(),
  surcharges: Immutable.List([]),
  surchargeTotal: '',
  totalToPay: '',
  recipeTotalPrice: '',
  recipeDiscountAmount: '',
  recipeDiscountPercent: '',
  extrasTotalPrice: '',
  showTitleSection: false,
  orderNumber: '',
  isReceiptInCheckout: false,
  isGoustoOnDemandEnabled: false,
}

class Receipt extends React.Component {
  dash = <span className={css.dash}>&mdash;</span>

  render() {
    const {
      prices,
      recipeTotalPrice,
      totalToPay,
      extrasTotalPrice,
      numRecipes,
      shippingAddress,
      surcharges,
      surchargeTotal,
      recipeDiscountAmount,
      recipeDiscountPercent,
      deliveryTotalPrice,
      showTitleSection,
      orderNumber,
      isReceiptInCheckout,
      deliveryDate,
      deliverySlot,
      children,
      isGoustoOnDemandEnabled,
    } = this.props
    const showRecipeDiscount = parseFloat(recipeDiscountAmount) > 0 ? true : null
    const showExtrasTotalPrice = parseFloat(extrasTotalPrice) > 0 ? true : null
    const showFreeDelivery = parseFloat(deliveryTotalPrice) === 0 ? true : null
    const showSurchargeTotalPrice = surcharges.size > 0 && surchargeTotal !== '0.00'
    const deliveryLineStyleForCheckout = showFreeDelivery ? 'checkoutPrimary' : 'checkoutNormal'
    const deliveryLineStyleDefault = showFreeDelivery ? 'primary' : 'normal'
    const deliveryLineStyle = isReceiptInCheckout ? deliveryLineStyleForCheckout : deliveryLineStyleDefault
    const totalPrice = isGoustoOnDemandEnabled
      ? formatOrderPrice(totalToPay)
      : formatDashOrPrice(totalToPay, numRecipes, prices, this.dash)

    return (
      <div className={classNames(css.row, { [css.rowInCheckout]: isReceiptInCheckout })}>
        {showTitleSection && <div className={css.row}><p className={css.titleSection}>Order Summary</p></div>}
        <ReceiptLine
          label={formatLabelPlural('Recipe', numRecipes)}
          lineStyle={isReceiptInCheckout ? 'checkoutNormal' : 'normal'}
          dataTesting="grossPrice"
        >
          {formatDashOrPrice(recipeTotalPrice, numRecipes, prices, this.dash)}
        </ReceiptLine>
        {showRecipeDiscount && (
          <ReceiptLine
            label={formatRecipeDiscount(recipeDiscountPercent)}
            lineStyle={isReceiptInCheckout ? 'checkoutPrimary' : 'primary'}
            dataTesting="discountAmount"
            showLineAbove={isReceiptInCheckout}
            isReceiptInCheckout={isReceiptInCheckout}
          >
            {`-${formatPrice(recipeDiscountAmount)}`}
          </ReceiptLine>
        )}
        {showSurchargeTotalPrice && (
          <ReceiptLine
            label={formatLabelPlural('Recipe surcharge', surcharges.size)}
            showLineAbove
            lineStyle={isReceiptInCheckout ? 'checkoutNormal' : 'normal'}
            isReceiptInCheckout={isReceiptInCheckout}
          >
            {formatPrice(surchargeTotal)}
          </ReceiptLine>
        )}
        {showExtrasTotalPrice && (
          <ReceiptLine
            label="Sides and market items"
            showLineAbove
            lineStyle={isReceiptInCheckout ? 'checkoutNormal' : 'normal'}
            isReceiptInCheckout={isReceiptInCheckout}
          >
            {formatPrice(extrasTotalPrice)}
          </ReceiptLine>
        )}
        <ReceiptLine
          label="Delivery"
          showLineAbove
          lineStyle={deliveryLineStyle}
          isReceiptInCheckout={isReceiptInCheckout}
        >
          {formatDeliveryTotal(prices, deliveryTotalPrice, this.dash)}
        </ReceiptLine>
        <ReceiptLine
          label="Total"
          lineStyle={isReceiptInCheckout ? 'checkoutBold' : 'bold'}
          showLineAbove
          dataTesting="totalPrice"
          isReceiptInCheckout={isReceiptInCheckout}
        >
          {totalPrice}
        </ReceiptLine>
        {shippingAddress && (
          <ReceiptLine label="Delivery" showLineAbove>
            <DeliveryDetails
              address={shippingAddress}
              date={deliveryDate}
              slot={deliverySlot}
            />
          </ReceiptLine>
        )}
        {orderNumber && (
          <ReceiptLine
            label="Order number"
            showLineAbove
            lineStyle={isReceiptInCheckout ? 'checkoutNormal' : 'normal'}
          >
            {orderNumber}
          </ReceiptLine>
        )}
        {children}
      </div>
    )
  }
}

Receipt.propTypes = propTypes
Receipt.defaultProps = defaultProps

export default Receipt
