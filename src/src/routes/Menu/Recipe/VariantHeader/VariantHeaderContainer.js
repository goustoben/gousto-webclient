import { connect } from 'react-redux'
import { getVariantsForRecipe } from '../../selectors/variants'
import { VariantHeader } from './VariantHeader'

const mapStateToProps = (state, ownProps) => ({
  recipeVariants: getVariantsForRecipe(state, ownProps)
})

const VariantHeaderContainer = connect(mapStateToProps)(VariantHeader)

export { VariantHeaderContainer }
