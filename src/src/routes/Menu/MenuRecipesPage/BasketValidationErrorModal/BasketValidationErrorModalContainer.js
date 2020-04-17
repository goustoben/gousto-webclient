import { connect } from 'react-redux'
import { getBasketNotValidError } from 'selectors/status'
import { getFormatedRulesMessage } from '../../selectors/basket'
import { BasketValidationErrorModal } from './BasketValidationErrorModal'
import { clearBasketNotValidError } from '../../actions/menuCheckoutClick'
import { basketRecipeSwap } from '../../actions/basketRecipes'

const mapStateToProps = (state) => {
  const basketRuleBroken = getBasketNotValidError(state)
  const hasBasketError = Boolean(basketRuleBroken)

  return ({
    title: hasBasketError ? basketRuleBroken.errorTitle : 'Basket Not Valid',
    shouldShow: hasBasketError,
    shouldShowSwapButton: hasBasketError && Boolean(basketRuleBroken.recipeId),
    brokenRulesToDisplay: hasBasketError ? getFormatedRulesMessage(state, basketRuleBroken.rules) : []
  })
}

const mapDispatchToProps = {
  closeModal: clearBasketNotValidError,
  basketRecipeSwap
}

export const BasketValidationErrorModalContainer = connect(mapStateToProps, mapDispatchToProps)(BasketValidationErrorModal)
