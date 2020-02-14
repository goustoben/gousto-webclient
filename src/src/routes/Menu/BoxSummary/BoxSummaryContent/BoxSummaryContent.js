import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import { boxSummaryViews } from 'utils/boxSummary'
import Details from '../Details'
import Postcode from '../Postcode'
import DeliverySlot from '../DeliverySlot'

class BoxSummaryContent extends React.PureComponent {
  static propTypes = {
    displayOptions: PropTypes.instanceOf(Immutable.List).isRequired,
    view: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    numPortions: PropTypes.number.isRequired,
    recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
    boxSummaryCurrentView: PropTypes.string.isRequired,
  }

  render() {
    const { view = 'desktop', date, orderId, displayOptions, numPortions, recipes, boxSummaryCurrentView } = this.props

    let boxSummaryView

    switch (boxSummaryCurrentView) {
    case boxSummaryViews.POSTCODE:
      boxSummaryView = <Postcode view={view} />
      break
    case boxSummaryViews.DELIVERY_SLOT:
      boxSummaryView = <DeliverySlot view={view} displayOptions={displayOptions} />
      break
    case boxSummaryViews.DETAILS:
      boxSummaryView = (
        <Details
          view={view}
          displayOptions={displayOptions}
          date={date}
          orderId={orderId}
          numPortions={numPortions}
          basketRecipes={recipes}
        />
      )
      break
    default:
      boxSummaryView = null
      break
    }

    return (
      <div>{boxSummaryView}</div>
    )
  }
}

export { BoxSummaryContent }
