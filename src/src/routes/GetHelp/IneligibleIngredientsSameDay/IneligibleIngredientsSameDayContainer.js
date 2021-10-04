import { connect } from 'react-redux'
import { trackIngredientsGoToMyGousto } from '../actions/getHelp'
import { IneligibleIngredientsSameDay } from './IneligibleIngredientsSameDay'

const IneligibleIngredientsSameDayContainer = connect(() => ({}), {
  trackIngredientsGoToMyGousto
})(IneligibleIngredientsSameDay)

export {
  IneligibleIngredientsSameDayContainer
}
