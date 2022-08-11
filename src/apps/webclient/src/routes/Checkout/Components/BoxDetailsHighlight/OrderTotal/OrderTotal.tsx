import React from 'react'

import {
  AlignItems,
  Box,
  JustifyContent,
  Display,
  TextAlign,
  FontWeight,
} from '@gousto-internal/citrus-react'
import Loading from 'Loading'
import { TickText } from 'TickText'

import { Receipt } from 'components/Receipt'
import { deliveryPriceConfig } from 'config/deliveryPrice'
import { getSurchargeItems } from 'utils/pricing'

import { PromoCode } from '../../PromoCode'
import { useGetOrderTotalData } from './orderTotalHooks'

type Props = {
  isLoading: boolean
}

export const OrderTotal = ({ isLoading }: Props) => {
  const { isGoustoOnDemandEnabled, prices, numRecipes } = useGetOrderTotalData()

  if (isLoading) {
    return (
      <Box
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        minHeight="18.75rem"
        data-testid="LoadingContainer"
      >
        <Box width="3rem" height="3rem">
          <Loading />
        </Box>
      </Box>
    )
  }

  return (
    <>
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
        isDeliveryFree={prices?.isDeliveryFree}
      />

      {!isGoustoOnDemandEnabled && <PromoCode data-testid="PromoCode" />}

      {prices?.isDeliveryFree && (
        <TickText
          textAlign={TextAlign.Left}
          fontWeight={FontWeight.Normal}
          tickPadding={2}
          highlightedText="Nice!"
          ordinaryText={`You get free delivery on your first box (usually ${deliveryPriceConfig.deliveryPriceFormatted}) as a welcome treat.`}
        />
      )}
    </>
  )
}
