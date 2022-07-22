import React from 'react'

import classNames from 'classnames'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import {
  formatPrice,
  formatLabelPlural,
  formatDashOrPrice,
  formatDeliveryTotal,
  formatRecipeDiscount,
} from 'utils/format'
import { formatOrderPrice } from 'utils/pricing'

import { DeliveryDetails } from './DeliveryDetails'
import { ReceiptLine } from './ReceiptLine'

import css from './Receipt.css'

const propTypes = {
  prices: PropTypes.instanceOf(Object),
  children: PropTypes.node,
  numRecipes: PropTypes.number,
  deliveryTotalPrice: PropTypes.string,
  shippingAddress: PropTypes.instanceOf(Immutable.Map),
  deliveryDate: PropTypes.string,
  deliverySlot: PropTypes.instanceOf(Immutable.Map),
  surcharges: PropTypes.instanceOf(Array),
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
  isDeliveryFree: PropTypes.bool,
}

const defaultProps = {
  prices: {},
  children: null,
  numRecipes: 0,
  deliveryTotalPrice: '',
  shippingAddress: null,
  deliveryDate: null,
  deliverySlot: Immutable.Map(),
  surcharges: [],
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
  isDeliveryFree: null,
}

export class Receipt extends React.Component {
  dash = (<span className={css.dash}>&mdash;</span>)

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
      isDeliveryFree,
    } = this.props
    const showRecipeDiscount = parseFloat(recipeDiscountAmount) > 0 ? true : null
    const showExtrasTotalPrice = parseFloat(extrasTotalPrice) > 0 ? true : null
    const showSurchargeTotalPrice = surcharges.length > 0 && surchargeTotal !== '0.00'
    const deliveryLineStyleForCheckout = isDeliveryFree ? 'checkoutPrimary' : 'checkoutNormal'
    const deliveryLineStyleDefault = isDeliveryFree ? 'primary' : 'normal'
    const deliveryLineStyle = isReceiptInCheckout
      ? deliveryLineStyleForCheckout
      : deliveryLineStyleDefault
    const totalPrice = isGoustoOnDemandEnabled
      ? formatOrderPrice(totalToPay)
      : formatDashOrPrice(totalToPay, numRecipes, prices, this.dash)

    return (
      <div className={classNames(css.row, { [css.rowInCheckout]: isReceiptInCheckout })}>
        {showTitleSection && (
          <div className={css.row}>
            <p className={css.titleSection}>Order Summary</p>
          </div>
        )}
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
            label={formatLabelPlural('Recipe surcharge', surcharges.length)}
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
          {formatDeliveryTotal(isDeliveryFree, deliveryTotalPrice, this.dash)}
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
            <DeliveryDetails address={shippingAddress} date={deliveryDate} slot={deliverySlot} />
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
