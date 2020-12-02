import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Column } from 'goustouicomponents'
import { Section } from '../components/Section'
import { DeliveryDayAndTime } from './sections/YourSubscriptionDetails/DeliveryDayAndTime'
import { Frequency } from './sections/YourSubscriptionDetails/Frequency'

import {
  yourSubscriptionDetailsSection,
  chefSelectsSettingsSection,
  totalPriceSection,
  skipABoxSection,
  pauseSubscriptionSection
} from '../subscriptionsSectionsContent'
import { DietaryPreference } from './sections/ChefSelectsSettings/DietaryPreference'

const ActiveSubscription = ({ accessToken, isMobile }) => (
  <Fragment>
    <Grid>
      <Column
        smallScreen={12}
        mediumScreen={6}
        largeScreen={6}
        hasPaddingSmallScreen={false}
      >
        <Section
          title={yourSubscriptionDetailsSection.title}
          subTitle={yourSubscriptionDetailsSection.subTitle}
          testingSelector={yourSubscriptionDetailsSection.testingSelector}
        >
          <DeliveryDayAndTime
            accessToken={accessToken}
            isMobile={isMobile}
          />
          <Frequency
            accessToken={accessToken}
            isMobile={isMobile}
          />
        </Section>
        <Section
          title={chefSelectsSettingsSection.title}
          subTitle={chefSelectsSettingsSection.subTitle}
          testingSelector={chefSelectsSettingsSection.testingSelector}
        >
          <DietaryPreference
            accessToken={accessToken}
            isMobile={isMobile}
          />
        </Section>
      </Column>
      <Column
        smallScreen={12}
        mediumScreen={6}
        largeScreen={6}
        hasPaddingSmallScreen={false}
      >
        <Section
          title={totalPriceSection.title}
          subTitle={totalPriceSection.subTitle}
          testingSelector={totalPriceSection.testingSelector}
        >
          <div />
        </Section>
      </Column>
    </Grid>
    <Grid>
      <Column
        smallScreen={12}
        mediumScreen={6}
        largeScreen={6}
        hasPaddingSmallScreen={false}
      >
        <Section
          title={skipABoxSection.title}
          subTitle={skipABoxSection.subTitle}
          testingSelector={skipABoxSection.testingSelector}
        >
          <div />
        </Section>
      </Column>
      <Column
        smallScreen={12}
        mediumScreen={6}
        largeScreen={6}
        hasPaddingSmallScreen={false}
      >
        <Section
          title={pauseSubscriptionSection.title}
          subTitle={pauseSubscriptionSection.subTitle}
          testingSelector={pauseSubscriptionSection.testingSelector}
        >
          <div />
        </Section>
      </Column>
    </Grid>
  </Fragment>

)

ActiveSubscription.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}

export { ActiveSubscription }
