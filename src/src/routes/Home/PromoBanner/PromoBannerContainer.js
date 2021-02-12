import { connect } from 'react-redux'
import promoActions from 'actions/promos'
import { redirect } from 'actions/redirect'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { getPromoBannerText } from 'selectors/features'
import { getPromoBannerState } from 'utils/home'

import home from 'config/home'

import { PromoBanner } from './PromoBanner'

const mapStateToProps = (state, ownProps) => {
  const text = getPromoBannerText(state) || home.promo.banner.mayText
  const { hide, promoCode, canApplyPromo } = getPromoBannerState(
    state,
    ownProps.promoCode,
    ownProps.location
  )

  return {
    text,
    hide,
    promoCode,
    canApplyPromo,
  }
}

const mapDispatchToProps = {
  redirect,
  promoChange: promoActions.promoChange,
  promoToggleModalVisibility: promoActions.promoToggleModalVisibility,
  trackUTMAndPromoCode,
}

export const PromoBannerContainer = connect(mapStateToProps, mapDispatchToProps)(PromoBanner)
