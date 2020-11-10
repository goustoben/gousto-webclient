import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

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
    <div className={css.subscriptionPage} data-testing="subscriptionSettingsPage">
      <h2 className={css.subscriptionPageTitle}>Subscription settings</h2>
      <section className={css.subscriptionPageContent}>
        <div className={css.subscriptionPageColumn}>First column cards placeholder</div>
        <div className={css.subscriptionPageColumn}>Second column placeholder</div>
      </section>
    </div>
  )
}

Subscription.propTypes = propTypes

export { Subscription }
