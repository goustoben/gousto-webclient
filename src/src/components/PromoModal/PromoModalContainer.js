import PromoModal from './PromoModal'
import { connect } from 'react-redux'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

const mapStateToProps = (state) => {
  const promoCode = state.promoCurrent
  const error = state.error.get(actionTypes.PROMO_GET) || state.error.get(actionTypes.PROMO_APPLY)
  let text = state.promoStore.getIn([promoCode, 'codeData', 'campaign', 'modalText'])
  let title = state.promoStore.getIn([promoCode, 'codeData', 'campaign', 'modalTitle'], null)

  const productIds = state.promoStore
    .getIn([promoCode, 'addGiftOrderRules'], Immutable.List())
    .filter(gift => gift.get('type') === 'Product')
    .map(gift => gift.get('id'))

  const numProducts = productIds.size

  const needsAgeVerification = productIds
    .map(id => state.products.get(id))
    .filter(product => product.get('ageRestricted'))
    .size > 0 && !state.user.get('ageVerified', false)

  let buttonText = error ? 'Close' : 'Claim Discount'

  if (!title) {
    if (numProducts > 0) {
      if (numProducts > 1) {
        title = 'These are on us!'
      } else {
        title = 'This one\'s on us!'
      }
      if (!error) {
        buttonText = 'Sounds Good'
      }
    } else {
      title = 'Hooray!'
    }
  }

  if (!text) {
    if (numProducts === 0) {
      text = `
			<p>A voucher (<strong>${promoCode}</strong>) has been applied on your Gousto box!</p>
			<p>Your discount will be automatically applied to your account.</p>
			<p>Happy cooking!</p>
			`
    } else {
      text = `<p>A voucher (<strong>${promoCode}</strong>) has been applied on your Gousto box! Your discount will be automatically applied to your account. Happy cooking!</p>`
    }
  }

  if (error) {
    title = 'Sorry!'
    buttonText = 'Close'
  }

  const isAgeVerified = state.promoAgeVerified || state.user.get('ageVerified', false)

  const pending = state.pending.get(actionTypes.PROMO_APPLY)

  return {
    error,
    text,
    title,
    promoCode,
    needsAgeVerification,
    buttonText,
    isAgeVerified,
    pending,
    justApplied: state.promoStore.getIn([promoCode, 'justApplied'], false),
  }
}

export default connect(mapStateToProps, {
  promoApply: actions.promoApply,
  close: actions.promoCloseModal,
})(PromoModal)
