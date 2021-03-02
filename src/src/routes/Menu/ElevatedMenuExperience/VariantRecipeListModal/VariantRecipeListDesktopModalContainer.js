import { connect } from 'react-redux'
import { recipeVariantDropdownExpanded } from 'actions/menu'
import { getCurrentExpandedRecipeVariantsDropdown } from 'selectors/menu'
import { getBrowserType } from 'selectors/browser'
import { VariantRecipeListDesktopModal } from './VariantRecipeListDesktopModal'

const mapStateToProps = (state) => ({
  currentExpandedRecipeVariantsDropdown: getCurrentExpandedRecipeVariantsDropdown(state),
  browserType: getBrowserType(state),
})

const mapDispatchToProps = {
  recipeVariantDropdownExpanded,
}

export const VariantRecipeListDesktopModalContainer = connect(mapStateToProps, mapDispatchToProps)(VariantRecipeListDesktopModal)
