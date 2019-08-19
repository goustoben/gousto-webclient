import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable' // eslint-disable no-caps

import { boxSummaryViews } from 'utils/boxSummary'
import Details from './Details'
import Postcode from './Postcode'
import DeliverySlot from './DeliverySlot'

class BoxSummary extends React.PureComponent {

  static propTypes = {
    displayOptions: PropTypes.instanceOf(Immutable.List),
    view: PropTypes.string,
    date: PropTypes.string,
    orderId: PropTypes.string,
    numPortions: PropTypes.number.isRequired,
    recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
    boxSummaryCurrentView: PropTypes.string,
    prices: PropTypes.instanceOf(Immutable.Map),
    pricesLoading: PropTypes.bool,
    loadPrices: PropTypes.func,
    showDetailsOnClick: PropTypes.bool
  }

  static defaultProps = {
    prices: Immutable.Map({}),
    pricesLoading: false,
    showDetailsOnClick: false
  }

  componentDidMount() {
    if (this.props.prices.size === 0 && this.props.pricesLoading === false) {
      this.props.loadPrices()
    }
  }

  componentWillReceiveProps(nextProps) {
    const observableProps = ['date', 'orderId', 'slotId', 'numPortions', 'recipes']

    const shouldRefreshPrices = observableProps
      .map(prop => this.props[prop] !== nextProps[prop])
      .filter(needRefresh => needRefresh).length > 0

    if (shouldRefreshPrices) {
      this.props.loadPrices()
    }
  }

  render() {
    const { view = 'desktop', date, orderId, displayOptions, numPortions, recipes, boxSummaryCurrentView, showDetailsOnClick } = this.props

    let boxSummaryView

    switch (boxSummaryCurrentView) {
    case boxSummaryViews.POSTCODE:
      boxSummaryView = <Postcode view={view} />
      break
    case boxSummaryViews.DELIVERY_SLOT:
      boxSummaryView = <DeliverySlot view={view} displayOptions={displayOptions} />
      break
    case boxSummaryViews.DETAILS:
      boxSummaryView = (<Details
        view={view}
        displayOptions={displayOptions}
        date={date}
        orderId={orderId}
        numPortions={numPortions}
        basketRecipes={recipes}
        showDetailsOnClick={showDetailsOnClick}
      />)
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

export default BoxSummary
