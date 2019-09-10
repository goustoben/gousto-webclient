import { connect } from 'react-redux'
import redirectAction from 'actions/redirect'
import basketActions from 'actions/basket'
import RecipesStep from './RecipesStep'

const RecipesStepContainer = connect(() => ({}), {
  redirect: redirectAction.redirect,
  basketSignupCollectionReceive: basketActions.basketSignupCollectionReceive,
})(RecipesStep)

export default RecipesStepContainer
