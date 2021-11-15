import { connect } from 'react-redux'
import { IneligibleIngredientsSameDay } from './IneligibleIngredientsSameDay'
import { trackIngredientsGoToMyGousto } from "routes/GetHelp/actions/getHelp/trackIngredientsGoToMyGousto"

const IneligibleIngredientsSameDayContainer = connect(() => ({}), {
  trackIngredientsGoToMyGousto
})(IneligibleIngredientsSameDay)

export {
  IneligibleIngredientsSameDayContainer
}
