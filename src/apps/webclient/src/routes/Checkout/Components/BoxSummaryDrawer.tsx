import React from 'react'

import { trackUTMAndPromoCode } from 'actions/tracking'
import css from 'routes/Checkout/Checkout.css'
import { ExpandableBoxSummary } from 'routes/Checkout/Components/ExpandableBoxSummary'
import { OrderSummaryAndBoxDetails } from 'routes/Checkout/Components/OrderSummaryAndBoxDetails'
import { usePricing } from 'routes/Menu/domains/pricing'

type BoxSummaryDrawerProps = {
  isCreatingPreviewOrder: boolean
  isGoustoOnDemandEnabled: boolean
}

/**
 * Drawer for "Total Price" and "Box Summary" container that is visible only on small-screen devices.
 * Note: for other than small-screen devices drawer is not expected to be shown as price and summary would be shown
 * on every step anyway.
 */
export const BoxSummaryDrawer = ({
  isCreatingPreviewOrder,
  isGoustoOnDemandEnabled,
}: BoxSummaryDrawerProps) => {
  const { pricing } = usePricing()

  return (
    <div className={css.mobileOnly} data-testing="checkoutExpandableBoxSummary">
      <ExpandableBoxSummary
        totalToPay={pricing?.total}
        totalWithoutDiscount={pricing?.recipeTotal}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
        promoCodeValid={pricing?.promoCodeValid}
      >
        <OrderSummaryAndBoxDetails
          isCreatingPreviewOrder={isCreatingPreviewOrder}
          isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
        />
      </ExpandableBoxSummary>
    </div>
  )
}
