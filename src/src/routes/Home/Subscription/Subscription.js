import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import config from 'config/home'
import Guide from 'Guide'
import css from './Subscription.css'

const Subscription = ({ steps, header, description, isBoxPricesPageRedesignEnabled }) => (
  <div className={classnames({[css.boxPricesRedesign]: isBoxPricesPageRedesignEnabled})}>
    <Guide steps={steps(isBoxPricesPageRedesignEnabled)} header={header} description={description} graphicType="svg" />
  </div>
)

Subscription.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  steps: PropTypes.func,
  isBoxPricesPageRedesignEnabled: PropTypes.bool,
}

Subscription.defaultProps = {
  steps: config.subscription.steps,
  isBoxPricesPageRedesignEnabled: false,
}

export { Subscription }
