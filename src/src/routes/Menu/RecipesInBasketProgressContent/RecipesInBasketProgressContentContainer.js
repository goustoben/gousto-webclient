import { connect } from 'react-redux'
import { getIsMenuProgressBarHidden } from 'selectors/features'
import { RecipesInBasketProgressContent } from './RecipesInBasketProgressContent.logic'

function mapStateToProps(state) {
  const isMenuProgressBarHidden = getIsMenuProgressBarHidden(state)
  const isAuthenticated = state.auth.get('isAuthenticated')

  return {
    isVisible: !isMenuProgressBarHidden || isAuthenticated
  }
}

export const RecipesInBasketProgressContentContainer = connect(mapStateToProps)(RecipesInBasketProgressContent)
