import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import humanTimeFormat from 'utils/timeFormat'
import { BottomFixedContent, CTA, Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import css from './BeforeDeliveryDay.css'

const redirectTo = (link) => () => {
  browserHistory.push(link)
}

const OnDeliveryDayWithTracking = ({ trackMyBoxLink, deliverySlot }) => {
  const { deliveryStart, deliveryEnd } = deliverySlot
  const humanFriendlyStart = humanTimeFormat(deliveryStart, 'hour')
  const humanFriendlyEnd = humanTimeFormat(deliveryEnd, 'hour')
  const { index, contact } = client.getHelp

  return (
    <GetHelpLayout2 headingText="Get help with your box">
      <Heading size="fontStyleM" type="h2">
        I don&apos;t know when my box will arrive
      </Heading>
      <div className={css.mainText}>
        <p>
          Your box&apos;s estimated arrival time is&nbsp;
          {humanFriendlyStart}
          &nbsp;-&nbsp;
          {humanFriendlyEnd}
          .
        </p>
        <p>
          The tracking link is available below but this can also be found on the day of delivery on the &quot;My Gousto&quot; page under your next box delivery.
        </p>
        <p>
          If it still has not arrive by then, it may still arrive today, just slightly delayed.
        </p>
        <p>
          If you&apos;re still experiencing a problem with your delivery, please get in touch.
        </p>
        <a className={css.link} href={`${index}/${contact}`}>Get in touch</a>
      </div>
      <BottomFixedContent>
        <div className={css.ctas}>
          <div className={css.cta}>
            <CTA
              isFullWidth
              size="small"
              variant="secondary"
              onClick={redirectTo(client.myGousto)}
            >
              View My Gousto
            </CTA>
          </div>
          <div className={css.cta}>
            <CTA isFullWidth size="small" onClick={redirectTo(trackMyBoxLink)}>
              Track my box
            </CTA>
          </div>
        </div>
      </BottomFixedContent>
    </GetHelpLayout2>
  )
}

OnDeliveryDayWithTracking.propTypes = {
  trackMyBoxLink: PropTypes.string.isRequired,
  deliverySlot: PropTypes.shape({
    deliveryStart: PropTypes.string.isRequired,
    deliveryEnd: PropTypes.string.isRequired,
  }).isRequired
}

export { OnDeliveryDayWithTracking }
