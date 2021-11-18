import { connect } from 'react-redux'
import {
  trackIngredientsGetInTouchClick,
  validateLatestOrder,
} from '../actions/getHelp'
import { RepetitiveIngredientsIssues } from './RepetitiveIngredientsIssues'
import { updateHasSeenRepetitiveIssuesScreen, trackContinueToSsrClick } from '../actions/repetitiveIngredientsIssues'
import { getNumOrdersChecked, getNumOrdersCompensated } from '../selectors/selectors'
import { getUserFirstName } from '../../../selectors/user'

const mapStateToProps = (state) => ({
  firstName: getUserFirstName(state),
  numOrdersChecked: getNumOrdersChecked(state),
  numOrdersCompensated: getNumOrdersCompensated(state),
})

const RepetitiveIngredientsIssuesContainer = connect(mapStateToProps, {
  trackIngredientsGetInTouchClick,
  trackContinueToSsrClick,
  updateHasSeenRepetitiveIssuesScreen,
  validateLatestOrder,
})(RepetitiveIngredientsIssues)

export {
  RepetitiveIngredientsIssuesContainer
}
