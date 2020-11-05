import React from 'react'
import css from './Subscription.css'

const Subscription = () => (
  <div className={css.subscriptionPage} data-testing="subscriptionSettingsPage">
    <h2 className={css.subscriptionPageTitle}>Subscription settings</h2>
    <section className={css.subscriptionPageContent}>
      <div className={css.subscriptionPageColumn}>First column cards placeholder</div>
      <div className={css.subscriptionPageColumn}>Second column placeholder</div>
    </section>
  </div>
)

export { Subscription }
