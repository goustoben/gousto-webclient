import React from 'react'
import { Grid, Column } from 'goustouicomponents'
import { Section } from '../components/Section'
import { resubscribeSection, orderABoxSection } from '../subscriptionsSectionsContent'
import { OrderABox } from './sections/OrderABox'

const PausedSubscription = () => (
  <Grid>
    <Column
      smallScreen={12}
      mediumScreen={6}
      largeScreen={6}
      hasPaddingSmallScreen={false}
    >
      <Section
        title={resubscribeSection.title}
        subTitle={resubscribeSection.subTitle}
        testingSelector={resubscribeSection.testingSelector}
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
        title={orderABoxSection.title}
        subTitle={orderABoxSection.subTitle}
        testingSelector={orderABoxSection.testingSelector}
      >
        <OrderABox />
      </Section>
    </Column>
  </Grid>
)

export { PausedSubscription }
