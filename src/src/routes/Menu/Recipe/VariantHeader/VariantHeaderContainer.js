import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getBrowserType } from 'selectors/browser'
import { getRecipeIdFromProps } from '../../selectors/recipe'
import { getVariantsForRecipe } from '../../selectors/variants'
import { VariantHeader } from './VariantHeader'

const LEAN_BEEF_OVERRIDES = ['2171', '2041', '2169', '2809', '1239']
const getTextOverride = createSelector(
  [getRecipeIdFromProps],
  (recipeId) => {
    if (LEAN_BEEF_OVERRIDES.includes(recipeId)) {
      return 'Swap for Lean Beef'
    }

    return null
  }
)

const mapStateToProps = (state, ownProps) => ({
  browserType: getBrowserType(state),
  recipeVariants: getVariantsForRecipe(state, ownProps),
  textOverride: getTextOverride(state, ownProps)
})

const VariantHeaderContainer = connect(mapStateToProps)(VariantHeader)

export { VariantHeaderContainer }
