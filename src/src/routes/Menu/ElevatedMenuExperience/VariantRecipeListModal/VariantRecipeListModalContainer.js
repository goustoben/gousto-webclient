import { connect } from 'react-redux'
import { getCurrentExpandedRecipeVariantsDropdown } from 'selectors/menu'
import { getBrowserType } from 'selectors/browser'
import { VariantRecipeListModal } from './VariantRecipeListModal'
import { recipeVariantDropdownExpanded } from "actions/menu/recipeVariantDropdownExpanded"

const mapStateToProps = (state) => ({
  currentExpandedRecipeVariantsDropdown: getCurrentExpandedRecipeVariantsDropdown(state),
  browserType: getBrowserType(state),
})

const mapDispatchToProps = {
  recipeVariantDropdownExpanded,
}

export const VariantRecipeListModalContainer = connect(mapStateToProps, mapDispatchToProps)(VariantRecipeListModal)
