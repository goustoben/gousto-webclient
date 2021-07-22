import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getRecipeIdFromProps } from '../../selectors/recipe'
import { getVariantsForRecipe } from '../../selectors/variants'
import { VariantHeader } from './VariantHeader'

const LEAN_BEEF_OVERRIDES = [
  '2171', '2809', '1239', '2154', '3204',
  '2046', '2048', '1938', '1020', '1476', '2532', '2443',
  '527', '1511', '953', '2026', '1237', '941', '390',
  '1255', '2676', '2031', '1493'
]

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
  recipeVariants: getVariantsForRecipe(state, ownProps),
  textOverride: getTextOverride(state, ownProps)
})

const VariantHeaderContainer = connect(mapStateToProps)(VariantHeader)

export { VariantHeaderContainer }
