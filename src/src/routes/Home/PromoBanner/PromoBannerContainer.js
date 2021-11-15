import { connect } from 'react-redux'
import { getPromoBannerText } from 'selectors/features'
import { getPromoBannerState } from 'utils/home'
import { promo } from 'config/home'
import { PromoBanner } from './PromoBanner'
import { applyPromoCodeAndShowModal } from "actions/home/applyPromoCodeAndShowModal"
import { redirect } from "actions/redirect/redirect"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"

const mapStateToProps = (state) => {
  const text = getPromoBannerText(state) || promo.defaultBannerText
  const { promoCode, canApplyPromo } = getPromoBannerState(state)

  return {
    text,
    promoCode,
    canApplyPromo,
  }
}

const mapDispatchToProps = {
  applyPromoCodeAndShowModal,
  redirect,
  trackUTMAndPromoCode,
}

export const PromoBannerContainer = connect(mapStateToProps, mapDispatchToProps)(PromoBanner)
