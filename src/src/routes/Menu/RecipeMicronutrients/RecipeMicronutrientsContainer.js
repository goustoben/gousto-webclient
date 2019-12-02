import Immutable from 'immutable'

import { connect } from 'react-redux'
import { getMicronutrientsForRecipeID } from 'selectors/recipe'
import { RecipeMicronutrients} from './RecipeMicronutrients'

const mapStateToProps = (state, ownProps) => ({
  micronutrients: getMicronutrientsForRecipeID(state, ownProps.id)
})

const RecipeMicronutrientsContainer = connect(mapStateToProps)(RecipeMicronutrients)

export { RecipeMicronutrientsContainer }
