import React from 'react'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { BottomFixedContent, CTA, Heading } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../../layouts/GetHelpLayout2'
import css from './BeforeDeliveryDay.css'

const redirectToMyGousto = () => {
  browserHistory.push(client.myGousto)
}

const BeforeDeliveryDay = () => (
  <GetHelpLayout2 headingText="Get help with your box">
    <Heading size="fontStyleM" type="h2">
      My box didn&apos;t arrive
    </Heading>
    <p className={css.mainText}>
      The tracking link is available on your day of delivery and this can be found on the &quot;My Gousto&quot; page under your next box delivery.
    </p>
    <BottomFixedContent>
      <CTA size="small" isFullWidth onClick={redirectToMyGousto}>
        View My Gousto
      </CTA>
    </BottomFixedContent>
  </GetHelpLayout2>
)

export { BeforeDeliveryDay }
