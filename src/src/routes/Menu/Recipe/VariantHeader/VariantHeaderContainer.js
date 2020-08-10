import { connect } from 'react-redux'
import { getAlternativesForRecipe } from '../../selectors/variants'
import { VariantHeader } from './VariantHeader'

const mapStateToProps = (state, ownProps) => ({
  recipeVariants: getAlternativesForRecipe(state, ownProps)
})

const VariantHeaderContainer = connect(mapStateToProps)(VariantHeader)

export { VariantHeaderContainer }
