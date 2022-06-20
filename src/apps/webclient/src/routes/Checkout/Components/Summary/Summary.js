import React, { PureComponent } from 'react'

import {
  Box,
  Text,
  Color,
  Display,
  AlignItems,
  JustifyContent,
  Heading1,
  Icon,
  IconVariant,
  Space,
} from '@gousto-internal/citrus-react'
import Loading from 'Loading'
import { PricePerServingMessage } from 'PricePerServingMessage'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { Receipt } from 'components/Receipt'
import { basketSum } from 'utils/basket'
import { getSurchargeItems } from 'utils/pricing'

import { PromoCode } from '../PromoCode'

import css from './Summary.css'

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  prices: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  basketRecipes: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  showPromocode: PropTypes.bool,
  isGoustoOnDemandEnabled: PropTypes.bool,
  totalToPay: PropTypes.string,
}

const defaultProps = {
  prices: {},
  basketRecipes: Immutable.Map({}),
  isLoading: false,
  showPromocode: true,
  isGoustoOnDemandEnabled: false,
  totalToPay: '',
}

class Summary extends PureComponent {
  render() {
    const { prices, basketRecipes, isLoading, showPromocode, isGoustoOnDemandEnabled, totalToPay } =
      this.props
    const numRecipes = basketSum(basketRecipes)

    return (
      <Box bg={Color.White} paddingH={6} paddingV={6} data-testing="checkoutOrderSummary">
        <header>
          <Heading1 size={4}>Order total</Heading1>
        </header>
        <Space size={4} direction="vertical" />
        {isLoading ? (
          <div className={css.loaderContainer}>
            <Loading className={css.loadingImage} />
          </div>
        ) : (
          <>
            <Box
              bg={Color.Success_50}
              borderColor={Color.Success_200}
              paddingV={2}
              paddingH={3}
              display={Display.Flex}
              alignItems={AlignItems.Center}
              justifyContent={JustifyContent.Center}
              borderWidth={0.5}
              borderStyle="solid"
              borderRadius={1.5}
            >
              <Text color={Color.Success_900}>
                <Space size={2} direction="vertical" />
                <Icon name="offer_percentage" variant={IconVariant.Inherit} />
              </Text>

              <Space size={2} direction="horizontal" />
              <PricePerServingMessage
                isPriceInCheckout
                fullPrice={prices?.pricePerPortion}
                discountedPrice={prices?.pricePerPortionDiscounted}
              />
            </Box>
            <Space size={5} direction="vertical" />
            <Box>
              <Receipt
                numRecipes={numRecipes}
                prices={prices}
                deliveryTotalPrice={prices?.deliveryTotal}
                surcharges={getSurchargeItems(prices?.items)}
                surchargeTotal={prices?.surchargeTotal}
                recipeTotalPrice={prices?.recipeTotal}
                totalToPay={prices?.total || ''}
                recipeDiscountAmount={prices?.recipeDiscount}
                recipeDiscountPercent={prices?.percentageOff}
                extrasTotalPrice={prices?.productTotal}
                isReceiptInCheckout
                isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
              />
              {showPromocode && <PromoCode />}
            </Box>
          </>
        )}
      </Box>
    )
  }
}

Summary.defaultProps = defaultProps
Summary.propTypes = propTypes

export { Summary }
