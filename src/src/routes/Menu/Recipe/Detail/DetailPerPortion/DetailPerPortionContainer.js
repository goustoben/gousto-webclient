import { connect } from 'react-redux'
import { getRecipePer100gProps, getRecipePerPortionProps } from '../../../selectors/recipe'
import { DetailPerPortion } from './DetailPerPortion'

const mapStateToProps = (state, ownProps) => ({
  perPortion: getRecipePerPortionProps(state, ownProps),
  per100Grams: getRecipePer100gProps(state, ownProps)
})

const DetailPerPortionContainer = connect(mapStateToProps)(DetailPerPortion)

export { DetailPerPortionContainer }
