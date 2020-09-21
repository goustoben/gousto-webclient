import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import config from 'config/home'
import Guide from 'Guide'
import css from './Subscription.css'

const Subscription = ({ steps, header, description, isHomePageRedesignEnabled, isBoxPricesPageRedesignEnabled }) => (
  <div className={classnames({ [css.homepageRedesign]: isHomePageRedesignEnabled }, {[css.boxPricesRedesign]: isBoxPricesPageRedesignEnabled})}>
    <Guide steps={steps(isHomePageRedesignEnabled || isBoxPricesPageRedesignEnabled)} header={header} description={description} graphicType="svg" />
  </div>
)

Subscription.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  steps: PropTypes.func,
  isHomePageRedesignEnabled: PropTypes.bool,
  isBoxPricesPageRedesignEnabled: PropTypes.bool,
}

Subscription.defaultProps = {
  steps: config.subscription.steps,
  isHomePageRedesignEnabled: false,
  isBoxPricesPageRedesignEnabled: false,
}

export { Subscription }
