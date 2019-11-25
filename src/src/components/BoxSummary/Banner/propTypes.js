import PropTypes from 'prop-types'
import Immutable from 'immutable'

export const boxSummaryBannerPropTypes = {
  showBrowseCTA: PropTypes.bool.isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
  menuRecipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  maxRecipesNum: PropTypes.number.isRequired,
  errorText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]).isRequired,
  openDetails: PropTypes.func.isRequired
}
