import { connect } from 'react-redux'
import { getDisclaimerForRecipeID } from 'selectors/recipe'
import { RecipeDisclaimer } from './RecipeDisclaimer'

const mapStateToProps = (state, ownProps) => ({
  disclaimer: getDisclaimerForRecipeID(state, ownProps.id)
})

const RecipeDisclaimerContainer = connect(mapStateToProps)(RecipeDisclaimer)

export { RecipeDisclaimerContainer }
