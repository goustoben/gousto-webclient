import { connect } from 'react-redux'
import { getRecipeIngredientsProps, getRecipeAllergensProps } from '../../../selectors/recipe'
import { DetailAllergenIngredients } from './DetailAllergenIngredients'

const mapStateToProps = (state, ownProps) => ({
  ingredients: getRecipeIngredientsProps(state, ownProps),
  allergens: getRecipeAllergensProps(state, ownProps),
})

const DetailAllergenIngredientsContainer = connect(mapStateToProps)(DetailAllergenIngredients)

export { DetailAllergenIngredientsContainer }
