import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Column } from 'goustouicomponents'
import { Section } from '../components/Section'
import { Divider } from '../components/Divider'
import { DeliveryDayAndTime } from './sections/YourSubscriptionDetails/DeliveryDayAndTime'
import { Frequency } from './sections/YourSubscriptionDetails/Frequency'
import { BoxSize } from './sections/YourSubscriptionDetails/BoxSize'
import { SkipABox } from './sections/SkipABox'
import { PauseSubscription } from './sections/PauseSubscription'
import { ResubscriptionModal } from './ResubscriptionModal'

import {
  yourSubscriptionDetailsSection,
  chefSelectsSettingsSection,
  skipABoxSection,
  pauseSubscriptionSection
} from '../subscriptionsSectionsContent'
import { DietaryPreference } from './sections/ChefSelectsSettings/DietaryPreference'
import { MealsPerBox } from './sections/ChefSelectsSettings/MealsPerBox'

const ActiveSubscription = ({ accessToken, isMobile, startOnScreenRecoverySubscriptionFlow }) => (
  <Fragment>
    <ResubscriptionModal />
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
          <BoxSize
            accessToken={accessToken}
            isMobile={isMobile}
          />
          <Frequency
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
          title={chefSelectsSettingsSection.title}
          subTitle={chefSelectsSettingsSection.subTitle}
          testingSelector={chefSelectsSettingsSection.testingSelector}
        >
          <MealsPerBox
            accessToken={accessToken}
            isMobile={isMobile}
          />
          <DietaryPreference
            accessToken={accessToken}
            isMobile={isMobile}
          />
        </Section>
      </Column>
    </Grid>

    <Grid>
      <Column
        smallScreen={12}
      >
        <Divider hidden={['sm']} />
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
          <SkipABox />
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
          <PauseSubscription startOnScreenRecoverySubscriptionFlow={startOnScreenRecoverySubscriptionFlow} />
        </Section>
      </Column>
    </Grid>
  </Fragment>

)

ActiveSubscription.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  startOnScreenRecoverySubscriptionFlow: PropTypes.func.isRequired
}

export { ActiveSubscription }
