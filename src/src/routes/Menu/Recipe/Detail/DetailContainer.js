import { connect } from 'react-redux'

import { getCutoffs } from 'utils/deliveries'
import moment from 'moment'

import { Detail } from './Detail'
import { getBrandAvailability } from '../../selectors/recipeTags'
import { closeRecipeDetails } from "routes/Menu/actions/closeRecipeDetails/closeRecipeDetails"

function mapStateToProps(state, ownProps) {
  let [cutoffDate] = getCutoffs(state.basket, state.boxSummaryDeliveryDays) // eslint-disable-line prefer-const
  if (!cutoffDate) {
    cutoffDate = moment()
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toISOString()
  }

  return {
    menuWithSides: false,
    cutoffDate,
    brandAvailability: getBrandAvailability(state, { recipeId: ownProps.id }),
  }
}

const DetailContainer = connect(mapStateToProps, {
  closeRecipeDetails
})(Detail)

export { DetailContainer }
