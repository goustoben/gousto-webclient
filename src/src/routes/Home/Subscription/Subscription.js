import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import config from 'config/home'
import Guide from 'Guide'
import css from './Subscription.css'

const Subscription = ({ steps, header, description, isHomePageRedesignEnabled }) => (
  <div className={classnames({ [css.homepageRedesign]: isHomePageRedesignEnabled })}>
    <Guide steps={steps(isHomePageRedesignEnabled)} header={header} description={description} graphicType="svg" />
  </div>
)

Subscription.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })),
  isHomePageRedesignEnabled: PropTypes.bool,
}

Subscription.defaultProps = {
  steps: config.subscription.steps,
  isHomePageRedesignEnabled: false,
}

export { Subscription }
