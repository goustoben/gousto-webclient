import React from 'react'

import { BoxDetailsContainer } from 'routes/Checkout/Components/BoxDetails'
import { Summary } from 'routes/Checkout/Components/Summary'

type OrderSummaryAndBoxDetailsProps = {
  isCreatingPreviewOrder: boolean
  isGoustoOnDemandEnabled: boolean
}

/**
 * Container for "Order Summary" and "Box details" containers showed during checkout.
 */
export const OrderSummaryAndBoxDetails = ({
  isCreatingPreviewOrder,
  isGoustoOnDemandEnabled,
}: OrderSummaryAndBoxDetailsProps) => (
  <>
    {/** TS and Eslint errors are suppressed as component was moved to TypeScript, but children components are not yet written in TS yet. */}
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/* @ts-ignore */}
    <Summary isLoading={isCreatingPreviewOrder} showPromoCode={!isGoustoOnDemandEnabled} />
    <BoxDetailsContainer />
  </>
)
