import PropTypes from 'prop-types'
import Immutable from 'immutable'

export const boxSummaryOverlayPropTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  view: PropTypes.string,
  date: PropTypes.string,
  numPortions: PropTypes.number.isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
  showDetails: PropTypes.bool.isRequired,
  orderSaveError: PropTypes.string,
}
