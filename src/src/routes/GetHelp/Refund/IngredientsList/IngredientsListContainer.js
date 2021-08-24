import { connect } from 'react-redux'
import { getSelectedIngredientsWithImage } from '../../selectors/selectors'
import { IngredientsList } from './IngredientsList'

const mapStateToProps = (state) => ({
  ingredients: getSelectedIngredientsWithImage(state),
})

const IngredientsListContainer = connect(mapStateToProps, {})(IngredientsList)

export { IngredientsListContainer }
