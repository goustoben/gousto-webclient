import { connect } from 'react-redux'
import { getBrowserType } from 'selectors/browser'
import { getVariantsForRecipe } from '../../selectors/variants'
import { VariantHeader } from './VariantHeader'

const mapStateToProps = (state, ownProps) => ({
  browserType: getBrowserType(state),
  recipeVariants: getVariantsForRecipe(state, ownProps)
})

const VariantHeaderContainer = connect(mapStateToProps)(VariantHeader)

export { VariantHeaderContainer }
