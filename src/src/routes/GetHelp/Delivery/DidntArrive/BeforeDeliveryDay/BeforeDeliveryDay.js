import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { BottomFixedContent, CTA, Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import css from './BeforeDeliveryDay.css'

const redirectToMyGousto = () => {
  browserHistory.push(client.myGousto)
}

const BeforeDeliveryDay = ({ trackClickMyGoustoInSSRDeliveries }) => (
  <GetHelpLayout2 headingText="Get help with your box">
    <Heading size="fontStyleM" type="h2">
      My box didn&apos;t arrive
    </Heading>
    <p className={css.mainText}>
      The tracking link is available on your day of delivery and this can be found on the &quot;My Gousto&quot; page under your next box delivery.
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
        View My Gousto
      </CTA>
    </BottomFixedContent>
  </GetHelpLayout2>
)

BeforeDeliveryDay.propTypes = {
  trackClickMyGoustoInSSRDeliveries: PropTypes.func.isRequired,
}

export { BeforeDeliveryDay }
