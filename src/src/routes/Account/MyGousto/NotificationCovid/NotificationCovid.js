import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Heading } from 'goustouicomponents'
import { zendesk as zendeskRoutes } from 'config/routes'
import { addUserIdToUrl } from 'utils/url'

const propTypes = {
  isTransactionalOrdersBlocked: PropTypes.bool.isRequired,
  isResubscriptionBlocked: PropTypes.bool.isRequired,
  userId: PropTypes.string,
}

const defaultProps = {
  userId: null,
}

const NotificationCovid = ({
  isTransactionalOrdersBlocked,
  isResubscriptionBlocked,
  userId,
}) => (
  <Alert type="info">
    <Heading type="h3">
      Coronavirus Update
    </Heading>
    <div>
      <p>
        Due to overwhelming demand, our delivery slots are nearly full.&nbsp;
        {isTransactionalOrdersBlocked && 'We’re very sorry that we’re still unable to take one-off orders. '}
        {isResubscriptionBlocked && 'Paused subscriptions cannot be reactivated right now.'}
      </p>
      <p>
        This is only temporary, and we can’t apologise enough. We’re working non-stop to create more capacity.
      </p>
      <p>
        Our customer care team is unable to place orders, but they’re here if you need anything else,
        or you can head to our help centre.
      </p>
      <p>
        Thank you for bearing with us and all your kind support over the last weeks.
      </p>
      <a
        href={addUserIdToUrl(zendeskRoutes.covid, userId)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit our help centre for more info
      </a>
    </div>
  </Alert>
)

NotificationCovid.propTypes = propTypes
NotificationCovid.defaultProps = defaultProps

export {
  NotificationCovid
}
