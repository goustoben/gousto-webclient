import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Heading } from 'goustouicomponents'
import { zendesk as zendeskRoutes } from 'config/routes'

const CONTENT = {
  transactional: {
    line1: 'Due to overwhelming demand, most of our delivery slots are full. ',
    line2: 'Unfortunately our customer care team can\'t place orders for you.',
    line3: 'If you can\'t find a free slot, please try another day or the following week. Thank you for bearing with us.',
    label: 'Visit our help centre for more info',
  },
  subscription: {
    line1: 'Due to overwhelming demand, you might struggle to move your deliveries or place extra orders. ',
    line2: 'Unfortunately our customer care team can\'t place orders for you.',
    line3: 'It would also be helpful if you could choose your recipes as early as possible. Thank you for bearing with us.',
    label: 'Visit our help centre for more info',
  },
}
const propTypes = {
  hasSubscriptionEnabled: PropTypes.bool.isRequired
}

const NotificationCovid = ({ hasSubscriptionEnabled }) => {
  const { transactional, subscription } = CONTENT
  const currentCopy = (hasSubscriptionEnabled === false)
    ? transactional
    : subscription

  return (
    <Alert type="info">
      <Heading type="h3">
        Coronavirus update
      </Heading>
      <div>
        <p>
          {currentCopy.line1}
          <strong>{currentCopy.line2}</strong>
        </p>
        <p>
          {currentCopy.line3}
        </p>
        <a href={zendeskRoutes.covid} target="_blank" rel="noopener noreferrer">
          {currentCopy.label}
        </a>
      </div>
    </Alert>
  )
}

NotificationCovid.propTypes = propTypes

export {
  NotificationCovid
}
