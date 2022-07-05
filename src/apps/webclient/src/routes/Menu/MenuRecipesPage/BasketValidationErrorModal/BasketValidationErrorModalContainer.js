import { connect } from 'react-redux'

import { getBasketNotValidError } from 'selectors/status'

import { clearBasketNotValidError } from '../../actions/menuCheckoutClick'
import { getFormatedRulesMessage } from '../../selectors/basket'
import { BasketValidationErrorModal } from './BasketValidationErrorModal'

const mapStateToProps = (state) => {
  const basketRuleBroken = getBasketNotValidError(state)
  const hasBasketError = Boolean(basketRuleBroken)

  return {
    title: hasBasketError ? basketRuleBroken.errorTitle : 'Basket Not Valid',
    shouldShow: hasBasketError,
    shouldShowSwapButton: hasBasketError && Boolean(basketRuleBroken.recipeId),
    brokenRulesToDisplay: hasBasketError
      ? getFormatedRulesMessage(state, basketRuleBroken.rules)
      : [],
    recipeToRemove: basketRuleBroken.rules[0].items[0],
    recipeToAdd: basketRuleBroken.recipeId,
  }
}

const mapDispatchToProps = {
  closeModal: clearBasketNotValidError,
  clearBasketNotValidError,
}

export const BasketValidationErrorModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasketValidationErrorModal)
