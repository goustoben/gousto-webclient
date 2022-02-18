import {
  Box,
  Text,
  Color,
  Display,
  AlignItems,
  JustifyContent,
  FontWeight,
  FontFamily,
  Icon,
  IconVariant,
  Space,
} from '@gousto-internal/citrus-react'
import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import Immutable from 'immutable'
import { PricePerServingMessage } from 'PricePerServingMessage'
import Receipt from 'Receipt'
import Loading from 'Loading'
import { getSurchargeItems } from 'utils/pricing'
import { basketSum } from 'utils/basket'
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
  isGoustoOnDemandEnabled: PropTypes.bool,
  totalToPay: PropTypes.string,
}

const defaultProps = {
  prices: Immutable.Map({}),
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
      <Box bg={Color.White} paddingH={6} paddingV={6} data-testing="CheckoutOrderSummary">
        <Text size={4} fontFamily={FontFamily.SemiBold} fontWeight={FontWeight.Bold}>
          Order total
        </Text>
        <Space size={4} direction="vertical" />
        {isLoading ? (
          <div className={css.loaderContainer}>
            <Loading className={css.loadingImage} />
          </div>
        ) : (
          <Box>
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
              <PricePerServingMessage isPriceInCheckout />
            </Box>
            <Space size={5} direction="vertical" />
            <Box>
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
            </Box>
          </Box>
        )}
      </Box>
    )
  }
}

Summary.defaultProps = defaultProps
Summary.propTypes = propTypes

export { Summary }
