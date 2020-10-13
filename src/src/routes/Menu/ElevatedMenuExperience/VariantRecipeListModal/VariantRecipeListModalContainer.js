import { connect } from 'react-redux'
import { recipeVariantDropdownExpanded } from 'actions/menu'
import { getCurrentExpandedRecipeVariantsDropdown } from 'selectors/menu'
import { getBrowserType } from 'selectors/browser'
import { VariantRecipeListModal } from './VariantRecipeListModal'

const mapStateToProps = (state) => ({
  currentExpandedRecipeVariantsDropdown: getCurrentExpandedRecipeVariantsDropdown(state),
  browserType: getBrowserType(state),
})

const mapDispatchToProps = {
  recipeVariantDropdownExpanded,
}

export const VariantRecipeListModalContainer = connect(mapStateToProps, mapDispatchToProps)(VariantRecipeListModal)
