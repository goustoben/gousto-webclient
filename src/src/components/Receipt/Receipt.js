import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import { formatPrice, formatLabelPlural, formatDashOrPrice, formatDeliveryTotal, formatRecipeDiscount } from 'utils/format'

import PromoCode from 'routes/Checkout/Components/PromoCode'
import css from './Receipt.css'
import ReceiptLine from './ReceiptLine'
import DeliveryDetails from './DeliveryDetails'

class Receipt extends React.Component {
  static propTypes = {
    prices: PropTypes.instanceOf(Immutable.Map),
    children: PropTypes.node,
    extrasPrice: PropTypes.number,
    numPortions: PropTypes.number,
    numRecipes: PropTypes.number,
    deliveryTotalPrice: PropTypes.string,
    shippingAddress: PropTypes.instanceOf(Immutable.Map),
    deliveryDate: PropTypes.string,
    deliverySlot: PropTypes.instanceOf(Immutable.Map),
    deliveryTime: PropTypes.string,
    vatableKey: PropTypes.string,
    vatableItems: PropTypes.bool,
    surcharges: PropTypes.instanceOf(Immutable.List),
    surchargeTotal: PropTypes.string,
    totalToPay: PropTypes.string,
    recipeTotalPrice: PropTypes.string,
    recipeDiscountAmount: PropTypes.string,
    recipeDiscountPercent: PropTypes.string,
    extrasTotalPrice: PropTypes.string,
    showAddPromocode: PropTypes.bool,
    showTitleSection: PropTypes.bool,
    orderNumber: PropTypes.string,
  }

  static defaultProps = {
    numPortions: 0,
    numRecipes: 0,
    vatableKey: '*',
    vatableItems: false,
    surcharges: Immutable.List([]),
    prices: Immutable.Map({}),
    surchargeTotal: '',
    totalToPay: '',
    recipeTotalPrice: '',
    extrasTotalPrice: '',
    recipeDiscountAmount: '',
    recipeDiscountPercent: '',
    deliveryTotalPrice: '',
    deliveryTime: '',
    showAddPromocode: false,
    showTitleSection: false,
    orderNumber: '',
  }

  dash = <span className={css.dash}>-</span>

  render() {
    const { prices, recipeTotalPrice, totalToPay, extrasTotalPrice, numRecipes, shippingAddress, surcharges, surchargeTotal, recipeDiscountAmount, recipeDiscountPercent, deliveryTotalPrice, showAddPromocode, showTitleSection, orderNumber } = this.props
    const showRecipeDiscount = parseFloat(recipeDiscountAmount) > 0 ? true : null
    const showExtrasTotalPrice = parseFloat(extrasTotalPrice) > 0 ? true : null
    const showSurchargeTotalPrice = surcharges.size && surchargeTotal

    return (
      <div className={css.row}>
        {
          showTitleSection
            ? <div className={css.row}><p className={css.titleSection}>Order Summary</p></div>
            : null
        }
        <ReceiptLine label={formatLabelPlural('Recipe', numRecipes)} style="normal">{formatDashOrPrice(recipeTotalPrice, numRecipes, prices, this.dash)}</ReceiptLine>
        {
          showRecipeDiscount
            ? <ReceiptLine label={formatRecipeDiscount(recipeDiscountPercent)} style="primary">{`-${formatPrice(recipeDiscountAmount)}`}</ReceiptLine>
            : null}
        {
          showSurchargeTotalPrice
            ? <ReceiptLine label={formatLabelPlural('Recipe surcharge', surcharges.size)} showLineAbove style="normal">{formatPrice(surchargeTotal)}</ReceiptLine>
            : null
        }
        {
          showExtrasTotalPrice
            ? <ReceiptLine label="Extras" showLineAbove style="normal">{formatPrice(extrasTotalPrice)}</ReceiptLine>
            : null
        }
        <ReceiptLine label="Delivery cost" showLineAbove style="normal">{formatDeliveryTotal(prices, deliveryTotalPrice, this.dash)}</ReceiptLine>
        <ReceiptLine label="Total" style="bold" showLineAbove>{formatDashOrPrice(totalToPay, numRecipes, prices, this.dash)}</ReceiptLine>
        {
          showAddPromocode && <PromoCode />
        }
        {shippingAddress &&
          <ReceiptLine label="Delivery" showLineAbove>
            <DeliveryDetails
              address={shippingAddress}
              date={this.props.deliveryDate}
              slot={this.props.deliverySlot}
            />
          </ReceiptLine>
        }
        {
          orderNumber
            ? <ReceiptLine label="Order number" showLineAbove style="normal">{orderNumber}</ReceiptLine>
            : null
        }
        {this.props.children}
      </div>
    )
  }
}

export default Receipt
