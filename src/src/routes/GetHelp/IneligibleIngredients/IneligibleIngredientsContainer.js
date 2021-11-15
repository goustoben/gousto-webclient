import { connect } from 'react-redux'
import { getIneligibleIngredientsError } from '../selectors/orderSelectors'
import { IneligibleIngredients } from './IneligibleIngredients'
import { trackIngredientsGetInTouchClick } from "routes/GetHelp/actions/getHelp/trackIngredientsGetInTouchClick"
import { trackIngredientsGoToMyGousto } from "routes/GetHelp/actions/getHelp/trackIngredientsGoToMyGousto"

const IneligibleIngredientsContainer = connect((state) => ({
  ineligibilityCriteria: getIneligibleIngredientsError(state),
}), {
  trackIngredientsGetInTouchClick,
  trackIngredientsGoToMyGousto
})(IneligibleIngredients)

export {
  IneligibleIngredientsContainer
}
