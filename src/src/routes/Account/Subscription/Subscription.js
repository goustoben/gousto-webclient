import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { LayoutPageWrapper, Grid, Column } from 'goustouicomponents'

import css from './Subscription.css'

const propTypes = {
  subscriptionLoadData: PropTypes.func.isRequired,
  userLoadData: PropTypes.func.isRequired,
  menuLoadBoxPrices: PropTypes.func.isRequired,
}

const Subscription = ({
  subscriptionLoadData,
  userLoadData,
  menuLoadBoxPrices,
}) => {
  useEffect(() => {
    subscriptionLoadData()
    userLoadData()
    menuLoadBoxPrices()
  }, [subscriptionLoadData, userLoadData, menuLoadBoxPrices])

  return (
    <LayoutPageWrapper size="medium" padding={false} testingSelector="subscriptionSettingsPage">
      <Grid>
        <Column smallScreen={12} mediumScreen={12}>
          <h2 className={css.subscriptionPageTitle}>Subscription settings</h2>
        </Column>
      </Grid>

      <Grid>
        <Column smallScreen={12} mediumScreen={6} largeScreen={6}>
          <div>First column cards placeholder</div>
        </Column>
        <Column smallScreen={12} mediumScreen={6} largeScreen={6}>
          <div>First column cards placeholder</div>
        </Column>
      </Grid>
    </LayoutPageWrapper>
  )
}

Subscription.propTypes = propTypes

export { Subscription }
