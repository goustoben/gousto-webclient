import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import Link from 'components/Link'
import { client } from 'config/routes'
import humanTimeFormat from 'utils/timeFormat'
import { BottomFixedContent, Card, CTA, Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import layoutCss from '../../../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './OnDeliveryDayWithTracking.css'

const redirectToInternal = (link) => {
  browserHistory.push(link)
}

const redirectToExternal = (link) => {
  window.location.assign(link)
}

const OnDeliveryDayWithTracking = ({
  deliverySlot,
  trackMyBoxLink,
  trackClickGetInTouchInSSRDeliveries,
  trackClickMyGoustoInSSRDeliveries,
  trackClickTrackMyBoxInSSRDeliveries,
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
          I don&apos;t know when my box will arrive
        </Heading>
        <div className={css.mainText} data-testing="onDeliveryDayWithTrackingContent">
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
          <Link
            className={css.link}
            to={`${index}/${contact}`}
            tracking={trackClickGetInTouchInSSRDeliveries}
          >
            Get in touch
          </Link>
        </div>
        <BottomFixedContent>
          <div className={css.ctas}>
            <div className={css.cta}>
              <CTA
                isFullWidth
                size="small"
                testingSelector="viewMyGoustoCTA"
                variant="secondary"
                onClick={() => {
                  trackClickMyGoustoInSSRDeliveries()
                  redirectToInternal(client.myGousto)
                }}
              >
                View My Gousto
              </CTA>
            </div>
            <div className={css.cta}>
              <CTA
                isFullWidth
                size="small"
                testingSelector="trackMyBoxCTA"
                onClick={() => {
                  trackClickTrackMyBoxInSSRDeliveries()
                  redirectToExternal(trackMyBoxLink)
                }}
              >
                Track my box
              </CTA>
            </div>
          </div>
        </BottomFixedContent>
      </Card>
    </GetHelpLayout2>
  )
}

OnDeliveryDayWithTracking.propTypes = {
  deliverySlot: PropTypes.shape({
    deliveryStart: PropTypes.string.isRequired,
    deliveryEnd: PropTypes.string.isRequired,
  }).isRequired,
  trackClickGetInTouchInSSRDeliveries: PropTypes.func.isRequired,
  trackClickMyGoustoInSSRDeliveries: PropTypes.func.isRequired,
  trackClickTrackMyBoxInSSRDeliveries: PropTypes.func.isRequired,
  trackMyBoxLink: PropTypes.string.isRequired,
}

export { OnDeliveryDayWithTracking }
