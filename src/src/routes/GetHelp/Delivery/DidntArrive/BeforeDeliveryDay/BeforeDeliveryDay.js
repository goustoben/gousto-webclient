import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { BottomFixedContent, Card, CTA, Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import layoutCss from '../../../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './BeforeDeliveryDay.css'

const redirectToMyGousto = () => {
  browserHistory.push(client.myGousto)
}

const BeforeDeliveryDay = ({ trackClickMyGoustoInSSRDeliveries }) => (
  <GetHelpLayout2 headingText="Get help with your box">
    <Card
      hasLateralBordersOnSmallScreens={false}
      className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
    >
      <Heading size="fontStyleM" type="h2">
        My box didn&apos;t arrive
      </Heading>
      <p className={css.mainText}>
        The tracking link is available on your day of delivery and this can be found on the &quot;My Nourished&quot; page under your next box delivery.
      </p>
      <BottomFixedContent>
        <CTA
          size="small"
          isFullWidth
          onClick={() => {
            trackClickMyGoustoInSSRDeliveries()
            redirectToMyGousto()
          }}
        >
          View My Nourished
        </CTA>
      </BottomFixedContent>
    </Card>
  </GetHelpLayout2>
)

BeforeDeliveryDay.propTypes = {
  trackClickMyGoustoInSSRDeliveries: PropTypes.func.isRequired,
}

export { BeforeDeliveryDay }
