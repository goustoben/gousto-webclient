import { connect } from 'react-redux'
import { getCurrentExpandedRecipeVariantsDropdown } from 'selectors/menu'
import { getBrowserType } from 'selectors/browser'
import { VariantRecipeListDesktopModal } from './VariantRecipeListDesktopModal'
import { recipeVariantDropdownExpanded } from "actions/menu/recipeVariantDropdownExpanded"

const mapStateToProps = (state) => ({
  currentExpandedRecipeVariantsDropdown: getCurrentExpandedRecipeVariantsDropdown(state),
  browserType: getBrowserType(state),
})

const mapDispatchToProps = {
  recipeVariantDropdownExpanded,
}

export const VariantRecipeListDesktopModalContainer = connect(mapStateToProps, mapDispatchToProps)(VariantRecipeListDesktopModal)
