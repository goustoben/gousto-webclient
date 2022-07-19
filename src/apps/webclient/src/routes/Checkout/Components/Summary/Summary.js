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
  FontWeight,
  TextAlign,
} from '@gousto-internal/citrus-react'
import Loading from 'Loading'
import { PricePerServingMessage } from 'PricePerServingMessage'
import { TickText } from 'TickText'
import config from 'config'
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
}

const defaultProps = {
  prices: {},
  basketRecipes: Immutable.Map({}),
  isLoading: false,
  showPromocode: true,
  isGoustoOnDemandEnabled: false,
}

class Summary extends PureComponent {
  render() {
    const { prices, basketRecipes, isLoading, showPromocode, isGoustoOnDemandEnabled } = this.props
    const numRecipes = basketSum(basketRecipes)
    const isDeliveryFree = prices?.isDeliveryFree

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
                isDeliveryFree={isDeliveryFree}
              />
              {showPromocode && <PromoCode />}
              {isDeliveryFree && (
                <TickText
                  textAlign={TextAlign.Left}
                  fontWeight={FontWeight.Normal}
                  tickPadding={2}
                  highlightedText="Nice!"
                  ordinaryText={`You get free delivery on your first box (usually ${config.deliveryPriceConfig.deliveryPriceFormatted}) as a welcome treat.`}
                />
              )}
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
