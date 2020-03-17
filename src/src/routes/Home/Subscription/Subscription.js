import PropTypes from 'prop-types'
import React from 'react'
import config from 'config/home'
import Guide from 'Guide'

const Subscription = ({ steps, header, description }) => (
  <div>
    <Guide steps={steps} header={header} description={description} graphicType="svg" />
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
}

Subscription.defaultProps = {
  steps: config.subscription.steps,
}

export { Subscription }
