import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import { boxSummaryViews } from 'utils/boxSummary'
import { DetailsContainer } from '../Details'
import { PostcodeContainer } from '../Postcode'
import { DeliverySlotContainer } from '../DeliverySlot'
import css from './BoxSummaryContent.css'
import { useBasketRequiredFeatureEnabled } from '../../hooks/useBasketRequiredFeatureEnabled'

const BoxSummaryContent = (props) => {
  const { view = 'desktop', date, orderId, displayOptions, numPortions, recipes, boxSummaryCurrentView } = props
  const isBasketRequiredFeatureEnabled = useBasketRequiredFeatureEnabled()

  let boxSummaryView

  switch (boxSummaryCurrentView) {
  case boxSummaryViews.POSTCODE:
    boxSummaryView = <PostcodeContainer view={view} />
    break
  case boxSummaryViews.DELIVERY_SLOT:
    boxSummaryView = <DeliverySlotContainer view={view} displayOptions={displayOptions} />
    break
  case boxSummaryViews.DETAILS:
    boxSummaryView = (
      <DetailsContainer
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
    <div className={isBasketRequiredFeatureEnabled ? css.boxSummaryView : ''}>{boxSummaryView}</div>
  )
}

BoxSummaryContent.propTypes = {
  displayOptions: PropTypes.instanceOf(Immutable.List).isRequired,
  view: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  numPortions: PropTypes.number.isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
  boxSummaryCurrentView: PropTypes.string.isRequired,
}

export { BoxSummaryContent }
