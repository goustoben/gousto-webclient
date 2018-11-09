import { connect } from 'react-redux'
import RecipesStep from './RecipesStep'
import redirectAction from 'actions/redirect'
import basketActions from 'actions/basket'

const RecipesStepContainer = connect(() => ({}), {
  redirect: redirectAction.redirect,
  basketSignupCollectionReceive: basketActions.basketSignupCollectionReceive,
})(RecipesStep)

export default RecipesStepContainer
