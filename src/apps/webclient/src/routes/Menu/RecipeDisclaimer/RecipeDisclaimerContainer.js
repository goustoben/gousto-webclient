import { connect } from 'react-redux'
import { getRecipeDisclaimerProps } from '../selectors/recipe'
import { RecipeDisclaimer } from './RecipeDisclaimer'

const mapStateToProps = (state, ownProps) => ({
  claim: getRecipeDisclaimerProps(state, ownProps)
})

const RecipeDisclaimerContainer = connect(mapStateToProps)(RecipeDisclaimer)

export { RecipeDisclaimerContainer }
