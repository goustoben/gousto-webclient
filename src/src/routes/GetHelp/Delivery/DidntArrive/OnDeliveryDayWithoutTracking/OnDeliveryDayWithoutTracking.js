import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Link'
import { client } from 'config/routes'
import humanTimeFormat from 'utils/timeFormat'
import { Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import css from './OnDeliveryDayWithoutTracking.css'

const OnDeliveryDayWithoutTracking = ({ deliverySlot }) => {
  const { deliveryStart, deliveryEnd } = deliverySlot
  const humanFriendlyStart = humanTimeFormat(deliveryStart, 'hour')
  const humanFriendlyEnd = humanTimeFormat(deliveryEnd, 'hour')
  const { index, contact } = client.getHelp

  return (
    <GetHelpLayout2 headingText="Get help with your box">
      <Heading size="fontStyleM" type="h2">
        My box didn&apos;t arrive
      </Heading>
      <div className={css.mainText}>
        <p>
          {`Your box's estimated arrival time is ${humanFriendlyStart} - ${humanFriendlyEnd}.`}
        </p>
        <p>
          If it still has not arrived by then, it may still arrive today, just slightly delayed.
        </p>
        <p>
          If you&apos;re still experiencing a problem with your delivery, please get in touch.
        </p>
        <Link className={css.link} to={`${index}/${contact}`}>
          Get in touch
        </Link>
      </div>
    </GetHelpLayout2>
  )
}

OnDeliveryDayWithoutTracking.propTypes = {
  deliverySlot: PropTypes.shape({
    deliveryStart: PropTypes.string.isRequired,
    deliveryEnd: PropTypes.string.isRequired,
  }).isRequired
}

export { OnDeliveryDayWithoutTracking }
