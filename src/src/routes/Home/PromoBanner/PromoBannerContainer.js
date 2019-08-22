import { connect } from 'react-redux'

import promoActions from 'actions/promos'
import { redirect } from 'actions/redirect'

import { PromoBanner } from './PromoBanner'

export const PromoBannerContainer = connect((state) => ({
  promoCurrent: state.promoCurrent,
  basketPromoCode: state.basket.get('promoCode'),
  isAuthenticated: state.auth.get('isAuthenticated'),
}), {
  redirect,
  promoChange: promoActions.promoChange,
  promoToggleModalVisibility: promoActions.promoToggleModalVisibility,
})(PromoBanner)
