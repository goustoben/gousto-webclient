import PropTypes from 'prop-types'
import React from 'react'
import config from 'config/home'
import Guide from 'Guide'
import css from './Subscription.css'

const Subscription = ({ steps, header, description }) => (
  <div className={css.boxPricesRedesign}>
    <Guide steps={steps} header={header} description={description} graphicType="svg" />
  </div>
)

Subscription.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  steps: PropTypes.func,
}

Subscription.defaultProps = {
  steps: config.subscription.steps,
}

export { Subscription }
