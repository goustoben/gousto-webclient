import Immutable from 'immutable'
import PropTypes from 'prop-types'

export const boxSummaryOverlayPropTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  view: PropTypes.string,
  date: PropTypes.string,
  numPortions: PropTypes.number.isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
  showDetails: PropTypes.bool.isRequired,
  orderSaveError: PropTypes.string,
  shouldDisplayFullScreenBoxSummary: PropTypes.bool,
  portionChangeErrorModalHandler: PropTypes.func,
}
