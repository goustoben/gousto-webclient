import { connect } from 'react-redux'
import { recipeVariantDropdownExpanded } from 'actions/menu'
import { getCurrentExpandedRecipeVariantsDropdown } from 'selectors/menu'
import { getAlternativesForRecipe } from '../../../selectors/variants'
import { DropdownArrow} from './DropdownArrow'

const mapStateToProps = (state, ownProps) => {
  const currentExpandedRecipeVariantsDropdown = getCurrentExpandedRecipeVariantsDropdown(state)

  return {
    recipeVariants: getAlternativesForRecipe(state, ownProps),
    showDropdown: currentExpandedRecipeVariantsDropdown ? currentExpandedRecipeVariantsDropdown.recipeId === ownProps.recipeId : false,
  }
}

const mapDispatchToProps = {
  recipeVariantDropdownExpanded
}

const DropdownArrowContainer = connect(mapStateToProps, mapDispatchToProps)(DropdownArrow)

export { DropdownArrowContainer }
