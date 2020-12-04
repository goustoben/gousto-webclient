import React from 'react'
import { Grid, Column } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { Section } from '../components/Section'
import { OrderABox } from './sections/OrderABox'
import { orderABoxSection } from '../subscriptionsSectionsContent'
import { Resubscribe } from './sections/Resubscribe'

export const PausedSubscription = ({ accessToken }) => (
  <Grid>
    <Column
      smallScreen={12}
      mediumScreen={6}
      largeScreen={6}
      hasPaddingSmallScreen={false}
    >
      <Resubscribe accessToken={accessToken} />
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

PausedSubscription.propTypes = {
  accessToken: PropTypes.string.isRequired
}
