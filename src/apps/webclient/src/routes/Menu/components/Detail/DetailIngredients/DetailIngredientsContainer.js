import { connect } from 'react-redux'

import { getRecipeIngredientsProps } from '../../../selectors/recipe'
import { DetailIngredients } from './DetailIngredients'

const mapStateToProps = (state, ownProps) => ({
  ingredients: getRecipeIngredientsProps(state, ownProps),
})

const DetailIngredientsContainer = connect(mapStateToProps)(DetailIngredients)

export { DetailIngredientsContainer }
