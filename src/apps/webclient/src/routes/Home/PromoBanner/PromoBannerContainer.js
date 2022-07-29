import React from 'react'

import { connect } from 'react-redux'

import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { applyPromoCodeAndShowModal } from 'routes/Home/homeActions'
import { promo } from 'routes/Home/homeConfig'
import { getPromoBannerState } from 'routes/Home/homeUtils'
import { getPromoBannerText } from 'selectors/features'

import { PromoBanner } from './PromoBanner'

const mapStateToProps = (state, ownProps) => {
  const { isTwoMonthPromoCodeEnabled } = ownProps

  const text =
    getPromoBannerText(state) ||
    (isTwoMonthPromoCodeEnabled ? promo.twoMonthBannerText : promo.defaultBannerText)
  const { promoCode, canApplyPromo } = getPromoBannerState(state, isTwoMonthPromoCodeEnabled)

  const isLoading = isTwoMonthPromoCodeEnabled === null

  return {
    text,
    promoCode,
    canApplyPromo,
    isLoading,
  }
}

const mapDispatchToProps = {
  applyPromoCodeAndShowModal,
  redirect,
  trackUTMAndPromoCode,
}

const PromoBannerConnected = connect(mapStateToProps, mapDispatchToProps)(PromoBanner)

export const PromoBannerContainer = () => {
  const isTwoMonthPromoCodeEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_two_month_promo_code_web_enabled',
  )

  return <PromoBannerConnected isTwoMonthPromoCodeEnabled={isTwoMonthPromoCodeEnabled} />
}
