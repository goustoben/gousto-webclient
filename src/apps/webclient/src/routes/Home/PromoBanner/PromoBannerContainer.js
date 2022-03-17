import React from 'react'
import { connect } from 'react-redux'
import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getPromoBannerText } from 'selectors/features'
import { getPromoBannerState } from 'utils/home'
import { applyPromoCodeAndShowModal } from 'actions/home'
import { promo } from 'config/home'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
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
    'beetroots_two_month_promo_code_web_enabled'
  )

  return <PromoBannerConnected isTwoMonthPromoCodeEnabled={isTwoMonthPromoCodeEnabled} />
}
