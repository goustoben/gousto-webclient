import { connect } from 'react-redux'
import { getIneligibleIngredientsError } from '../selectors/orderSelectors'
import { trackIngredientsGetInTouchClick, trackIngredientsGoToMyGousto } from '../actions/getHelp'
import { IneligibleIngredients } from './IneligibleIngredients'

const IneligibleIngredientsContainer = connect((state) => ({
  ineligibilityCriteria: getIneligibleIngredientsError(state),
}), {
  trackIngredientsGetInTouchClick,
  trackIngredientsGoToMyGousto
})(IneligibleIngredients)

export {
  IneligibleIngredientsContainer
}
