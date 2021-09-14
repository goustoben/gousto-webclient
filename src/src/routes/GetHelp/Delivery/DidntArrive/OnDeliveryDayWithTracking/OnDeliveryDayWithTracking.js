import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
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
          Your box may still be on its way
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
            If it&apos;s late, our courier might be experiencing some delays. To find out where your box is right now, try the tracking link below. You can also find delivery information on your &quot;My Gousto&quot; page under your next box delivery.
          </p>
          <p>
            If there&apos;s a problem with your delivery, please get in touch and our helpful team will get it sorted.
          </p>
        </div>
        <BottomFixedContent>
          <div className={css.ctas}>
            <div className={css.cta}>
              <CTA
                isFullWidth
                size="small"
                testingSelector="getInTouchCTA"
                variant="secondary"
                onClick={() => {
                  trackClickGetInTouchInSSRDeliveries()
                  redirectToInternal(`${index}/${contact}`)
                }}
              >
                Get in touch
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
  trackClickTrackMyBoxInSSRDeliveries: PropTypes.func.isRequired,
  trackMyBoxLink: PropTypes.string.isRequired,
}

export { OnDeliveryDayWithTracking }
