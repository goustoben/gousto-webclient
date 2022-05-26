import React from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { boxSummaryViews } from 'utils/boxSummary'

import { DeliverySlotContainer } from '../DeliverySlot'
import { DetailsContainer } from '../Details'
import { PostcodeContainer } from '../Postcode'

const BoxSummaryContent = (props) => {
  const {
    view = 'desktop',
    date,
    orderId,
    displayOptions,
    numPortions,
    recipes,
    boxSummaryCurrentView,
    portionChangeErrorModalHandler,
  } = props

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
          portionChangeErrorModalHandler={portionChangeErrorModalHandler}
        />
      )
      break
    default:
      boxSummaryView = null
      break
  }

  return <div>{boxSummaryView}</div>
}

BoxSummaryContent.propTypes = {
  displayOptions: PropTypes.instanceOf(Immutable.List).isRequired,
  view: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  numPortions: PropTypes.number.isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
  boxSummaryCurrentView: PropTypes.string.isRequired,
  portionChangeErrorModalHandler: PropTypes.func.isRequired,
}

export { BoxSummaryContent }
