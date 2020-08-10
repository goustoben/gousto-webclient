import { connect } from 'react-redux'
import { recipeVariantDropdownExpanded } from 'actions/menu'
import { getCurrentExpandedRecipeVariantsDropdown } from 'selectors/menu'
import { getAlternativesForRecipe } from '../../../selectors/variants'
import { DropdownArrow} from './DropdownArrow'

const mapStateToProps = (state, ownProps) => ({
  recipeVariants: getAlternativesForRecipe(state, ownProps),
  showDropdown: getCurrentExpandedRecipeVariantsDropdown(state) === ownProps.recipeId
})

const mapDispatchToProps = {
  recipeVariantDropdownExpanded
}

const DropdownArrowContainer = connect(mapStateToProps, mapDispatchToProps)(DropdownArrow)

export { DropdownArrowContainer }
