import { connect } from 'react-redux'
import { getBasketNotValidError } from 'selectors/status'
import { getFormatedRulesMessage } from '../../selectors/basket'
import { BasketValidationErrorModal } from './BasketValidationErrorModal'
import { clearBasketNotValidError } from '../../actions/menuCheckoutClick'

const mapStateToProps = (state) => {
  const basketRuleBroken = getBasketNotValidError(state)
  const hasBasketError = !!basketRuleBroken

  return ({
    title: 'Basket Not Valid',
    shouldShow: hasBasketError,
    brokenRulesToDisplay: hasBasketError ? getFormatedRulesMessage(state, basketRuleBroken) : []
  })
}

const mapDispatchToProps = {
  closeModal: clearBasketNotValidError
}

export const BasketValidationErrorModalContainer = connect(mapStateToProps, mapDispatchToProps)(BasketValidationErrorModal)
