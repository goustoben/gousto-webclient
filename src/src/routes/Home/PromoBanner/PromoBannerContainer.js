import { connect } from 'react-redux'
import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getPromoBannerText } from 'selectors/features'
import { getPromoBannerState } from 'utils/home'
import { applyPromoCodeAndShowModal } from 'actions/home'
import { promo } from 'config/home'
import { PromoBanner } from './PromoBanner'

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
