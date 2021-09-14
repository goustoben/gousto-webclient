import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Link'
import { client } from 'config/routes'
import humanTimeFormat from 'utils/timeFormat'
import { Card, Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import layoutCss from '../../../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './OnDeliveryDayWithoutTracking.css'

const OnDeliveryDayWithoutTracking = ({
  deliverySlot,
  trackClickGetInTouchInSSRDeliveries,
}) => {
  const { deliveryStart, deliveryEnd } = deliverySlot
  const humanFriendlyStart = humanTimeFormat(deliveryStart, 'hour')
  const humanFriendlyEnd = humanTimeFormat(deliveryEnd, 'hour')
  const { index, contact } = client.getHelp

  return (
    <GetHelpLayout2 headingText="Get help with your box">
      <Card
        hasLateralBordersOnSmallScreens={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >
        <Heading size="fontStyleM" type="h2">
          My box didn&apos;t arrive
        </Heading>
        <div className={css.mainText} data-testing="onDeliveryDayWithoutTrackingContent">
          <p>
            {`Your box's estimated arrival time is ${humanFriendlyStart} - ${humanFriendlyEnd}.`}
          </p>
          <p>
            If it still has not arrived by then, it may still arrive today, just slightly delayed.
          </p>
          <p>
            If you&apos;re still experiencing a problem with your delivery, please get in touch.
          </p>
          <Link
            className={css.link}
            to={`${index}/${contact}`}
            tracking={trackClickGetInTouchInSSRDeliveries}
          >
            Get in touch
          </Link>
        </div>
      </Card>
    </GetHelpLayout2>
  )
}

OnDeliveryDayWithoutTracking.propTypes = {
  deliverySlot: PropTypes.shape({
    deliveryStart: PropTypes.string.isRequired,
    deliveryEnd: PropTypes.string.isRequired,
  }).isRequired,
  trackClickGetInTouchInSSRDeliveries: PropTypes.func.isRequired,
}

export { OnDeliveryDayWithoutTracking }
