import { connect } from 'react-redux'
import promoActions from 'actions/promos'
import PromoBanner from './PromoBanner'

const PromoBannerContainer = connect((state) => ({
	promoCurrent: state.promoCurrent,
	basketPromoCode: state.basket.get('promoCode'),
	isAuthenticated: state.auth.get('isAuthenticated'),
}), {
	promoChange: promoActions.promoChange,
	promoToggleModalVisibility: promoActions.promoToggleModalVisibility,
})(PromoBanner)

export default PromoBannerContainer
