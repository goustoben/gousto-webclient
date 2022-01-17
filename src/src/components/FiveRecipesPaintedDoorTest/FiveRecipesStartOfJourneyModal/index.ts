
import { connect } from 'react-redux'
import { FiveRecipesStartOfJourney } from './FiveRecipesStartOfJourney'

const mapStateToProps = (state: any) => ({
  discount: parseFloat(state.menuBoxPrices.getIn(['2', '2', 'vegetarian', 'percentageOff'])),
})

export const FiveRecipesStartOfJourneyModal = connect(mapStateToProps)(FiveRecipesStartOfJourney)

