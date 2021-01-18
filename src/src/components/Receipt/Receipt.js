import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { formatPrice, formatLabelPlural, formatDashOrPrice, formatDeliveryTotal, formatRecipeDiscount } from 'utils/format'

import PromoCode from 'routes/Checkout/Components/PromoCode'
import css from './Receipt.css'
import ReceiptLine from './ReceiptLine'
import DeliveryDetails from './DeliveryDetails'
import { FirstDeliveryDayContainer } from './FirstDeliveryDay'

class Receipt extends React.Component {
  static propTypes = {
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
    showAddPromocode: PropTypes.bool,
    showTitleSection: PropTypes.bool,
    orderNumber: PropTypes.string,
    hasFirstDeliveryDay: PropTypes.bool,
    isCheckoutOverhaulEnabled: PropTypes.bool,
  }

  static defaultProps = {
    numRecipes: 0,
    surcharges: Immutable.List([]),
    prices: Immutable.Map({}),
    surchargeTotal: '',
    totalToPay: '',
    recipeTotalPrice: '',
    extrasTotalPrice: '',
    recipeDiscountAmount: '',
    recipeDiscountPercent: '',
    deliveryTotalPrice: '',
    showAddPromocode: false,
    showTitleSection: false,
    orderNumber: '',
    hasFirstDeliveryDay: false,
    isCheckoutOverhaulEnabled: false,
  }

  dash = <span className={css.dash}>&mdash;</span>

  render() {
    const { prices, recipeTotalPrice, totalToPay, extrasTotalPrice, numRecipes, shippingAddress, surcharges, surchargeTotal, recipeDiscountAmount, recipeDiscountPercent, deliveryTotalPrice, showAddPromocode, showTitleSection, orderNumber, hasFirstDeliveryDay, isCheckoutOverhaulEnabled } = this.props
    const showRecipeDiscount = parseFloat(recipeDiscountAmount) > 0 ? true : null
    const showExtrasTotalPrice = parseFloat(extrasTotalPrice) > 0 ? true : null
    const showFreeDelivery = parseFloat(deliveryTotalPrice) === 0 ? true : null
    const showSurchargeTotalPrice = surcharges.size && surchargeTotal

    return (
      <div className={classNames(css.row, { [css.rowRedesign]: isCheckoutOverhaulEnabled })}>
        {
          showTitleSection
            ? <div className={css.row}><p className={css.titleSection}>Order Summary</p></div>
            : null
        }
        <ReceiptLine label={formatLabelPlural('Recipe', numRecipes)} style="normal" dataTesting="grossPrice" isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}>{formatDashOrPrice(recipeTotalPrice, numRecipes, prices, this.dash)}</ReceiptLine>
        {
          showRecipeDiscount
            ? <ReceiptLine label={formatRecipeDiscount(recipeDiscountPercent)} style="primary" dataTesting="discountAmount" showLineAbove={isCheckoutOverhaulEnabled} isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}>{`-${formatPrice(recipeDiscountAmount)}`}</ReceiptLine>
            : null
        }
        {
          showSurchargeTotalPrice
            ? <ReceiptLine label={formatLabelPlural('Recipe surcharge', surcharges.size)} showLineAbove style="normal" isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}>{formatPrice(surchargeTotal)}</ReceiptLine>
            : null
        }
        {
          showExtrasTotalPrice
            ? <ReceiptLine label="Extras" showLineAbove style="normal" isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}>{formatPrice(extrasTotalPrice)}</ReceiptLine>
            : null
        }
        <ReceiptLine label="Delivery" showLineAbove style={showFreeDelivery ? 'primary' : 'normal'} isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}>{formatDeliveryTotal(prices, deliveryTotalPrice, this.dash)}</ReceiptLine>
        <ReceiptLine label="Total" style="bold" showLineAbove dataTesting="totalPrice" isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}>{formatDashOrPrice(totalToPay, numRecipes, prices, this.dash)}</ReceiptLine>
        { hasFirstDeliveryDay && !isCheckoutOverhaulEnabled && <FirstDeliveryDayContainer /> }
        {
          showAddPromocode && <PromoCode />
        }
        {shippingAddress && (
          <ReceiptLine label="Delivery" showLineAbove>
            <DeliveryDetails
              address={shippingAddress}
              date={this.props.deliveryDate}
              slot={this.props.deliverySlot}
            />
          </ReceiptLine>
        )}
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
