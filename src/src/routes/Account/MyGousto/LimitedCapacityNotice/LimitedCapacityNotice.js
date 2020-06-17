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

const LimitedCapacityNotice = ({
  isTransactionalOrdersBlocked,
  isResubscriptionBlocked,
  userId,
}) => (
  <Alert type="info">
    <Heading type="h3" size="_legacy_medium">
      We’re full to the brim
    </Heading>
    <div>
      <p>
        Due to overwhelming demand, our delivery slots are nearly full.&nbsp;
        {isTransactionalOrdersBlocked
          ? 'We’re very sorry that we’re still unable to take one-off orders. '
          : 'If you’re having issues finding an available slot, try changing your delivery day.'}
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

LimitedCapacityNotice.propTypes = propTypes
LimitedCapacityNotice.defaultProps = defaultProps

export {
  LimitedCapacityNotice
}
