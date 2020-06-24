import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import config from 'config/home'
import Guide from 'Guide'
import css from './HowItWorks.css'

const HowItWorks = ({ steps, header, description, variant, isHomePageRedesignEnabled }) => (
  <div className={classnames({[css.homepageRedesign]: isHomePageRedesignEnabled})}>
    <Guide steps={steps(variant, isHomePageRedesignEnabled)} header={header} description={description} />
  </div>
)

HowItWorks.propTypes = {
  header: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired,
  steps: PropTypes.func,
  variant: PropTypes.string,
  isHomePageRedesignEnabled: PropTypes.bool,
}

HowItWorks.defaultProps = {
  steps: config.howItWorks.steps,
  variant: 'default',
  isHomePageRedesignEnabled: false,
}

export { HowItWorks }
