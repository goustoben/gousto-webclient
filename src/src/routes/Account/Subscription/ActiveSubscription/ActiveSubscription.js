import React, { Fragment } from 'react'
import { Grid, Column } from 'goustouicomponents'
import { Section } from '../components/Section'
import { SettingSection } from '../components/SettingSection'
import { yourSubscriptionDetailsSection, chefSelectsSettingsSection, totalPriceSection, skipABoxSection, pauseSubscriptionSection } from '../subscriptionsSectionsContent'

const ActiveSubscription = () => (
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
          <SettingSection
            icon="calendar"
            title="Delivery day and time"
            instruction="Choose day and time"
            ctaText="Save day and time"
            renderCurrentValue={<p>Some ting</p>}
            onSubmit={() => console.log('Submit')}
            onExpand={() => console.log('On Expand')}
            isMobile
          >
            <div>Some stuff in here</div>
            <div>Some stuff in here</div>
            <div>Some stuff in here</div>
            <div>Some stuff in here</div>
          </SettingSection>
        </Section>
        <Section
          title={chefSelectsSettingsSection.title}
          subTitle={chefSelectsSettingsSection.subTitle}
          testingSelector={chefSelectsSettingsSection.testingSelector}
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

export { ActiveSubscription }
