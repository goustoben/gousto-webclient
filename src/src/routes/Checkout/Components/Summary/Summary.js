import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import Immutable from 'immutable'
import { PricePerServingMessage } from 'PricePerServingMessage'
import Receipt from 'Receipt'
import Loading from 'Loading'
import { getSurchargeItems } from 'utils/pricing'
import { basketSum } from 'utils/basket'
import { jsx } from '@emotion/react'
import {
  Icon,
  Space,
  Box,
  Color,
  AlignItems,
  FlexDirection,
  Heading5,
  Space,
} from '@gousto-internal/zest-react'
import { SectionHeader } from '../SectionHeader'
import { PromoCode } from '../PromoCode'
import css from './Summary.css'

const propTypes = {
  prices: PropTypes.instanceOf(Immutable.Map),
  // eslint-disable-next-line react/forbid-prop-types
  basketRecipes: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  showPromocode: PropTypes.bool,
  isPaymentBeforeChoosingEnabled: PropTypes.bool,
  numberOfRecipes: PropTypes.number,
  isGoustoOnDemandEnabled: PropTypes.bool,
  totalToPay: PropTypes.string,
}

const defaultProps = {
  prices: Immutable.Map({}),
  basketRecipes: Immutable.Map({}),
  isLoading: false,
  showPromocode: true,
  isPaymentBeforeChoosingEnabled: false,
  numberOfRecipes: 0,
  isGoustoOnDemandEnabled: false,
  totalToPay: '',
}

class Summary extends PureComponent {
  render() {
    const {
      prices,
      basketRecipes,
      isLoading,
      showPromocode,
      isPaymentBeforeChoosingEnabled,
      numberOfRecipes,
      isGoustoOnDemandEnabled,
      totalToPay,
    } = this.props
    const numRecipes = isPaymentBeforeChoosingEnabled ? numberOfRecipes : basketSum(basketRecipes)

    return (
      <div className={css.summaryContainerRedesign} data-testing="checkoutOrderSummary">
        <Heading5>Order total</Heading5>
        <Space size={4} direction="vertical" />
        {isLoading ? (
          <div className={css.loaderContainer}>
            <Loading className={css.loadingImage} />
          </div>
        ) : (
          <Fragment>
            <Box
              bg={Color.Success_50}
              borderColor={Color.Success_100}
              borderStyle="solid"
              borderWidth={0.5}
              borderRadius={2}
              paddingV={3}
              display="flex"
              alignItems={AlignItems.Center}
              flexDirection={FlexDirection.Column}
            >
              <Box display="flex" flexDirection={FlexDirection.Row}>
                <Icon name="offer_percentage" variant="Confirmation" />
                <Space size={1} direction="horizontal" />
                <PricePerServingMessage isPriceInCheckout />
              </Box>
            </Box>
            <Space size={2} direction="horizontal" />
            <div className={css.details}>
              <Receipt
                numRecipes={numRecipes}
                prices={prices}
                deliveryTotalPrice={prices.get('deliveryTotal')}
                surcharges={getSurchargeItems(prices.get('items'))}
                surchargeTotal={prices.get('surchargeTotal')}
                recipeTotalPrice={prices.get('recipeTotal')}
                totalToPay={totalToPay}
                recipeDiscountAmount={prices.get('recipeDiscount')}
                recipeDiscountPercent={prices.get('percentageOff')}
                extrasTotalPrice={prices.get('productTotal')}
                isReceiptInCheckout
                isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
              />
              {showPromocode && <PromoCode />}
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

Summary.defaultProps = defaultProps
Summary.propTypes = propTypes

export { Summary }
