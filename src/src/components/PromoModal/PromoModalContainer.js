import { connect } from 'react-redux'
import actions from 'actions'
import Immutable from 'immutable'
import { client } from 'config/routes'
import { actionTypes } from 'actions/actionTypes'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { promoToggleModalVisibility } from 'actions/promos'
import { PromoModal } from './PromoModal'
import css from './PromoModal.css'

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

  let buttonText = error ? 'Close' : 'Claim discount'

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
      title = 'Join today with a tasty offer!'
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
      text = '<p>Here’s a discount for your first Gousto box. Your discount will be automatically applied at checkout.</p>'
    }
  }

  if (error) {
    title = 'Sorry, your offer could not be applied!'
    buttonText = 'Close'
    text = error === 'Code is only applicable for new customers'
      ? '<p>The promotion you tried to use is only for new customers.</p>'
      : '<p>Something went wrong and your offer could not be applied.</p>'
      + `<p>Try again or contact our Customer Care team via our <a href=${client.helpCentre} class=${css.link} target="_blank" rel="noopener noreferrer">Help Centre</a>.</p>`
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

export const PromoModalContainer = connect(mapStateToProps, {
  promoApply: actions.promoApply,
  trackUTMAndPromoCode,
  closeModal: () => promoToggleModalVisibility(false)
})(PromoModal)
