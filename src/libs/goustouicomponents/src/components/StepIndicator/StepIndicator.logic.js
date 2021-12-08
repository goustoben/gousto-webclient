import React from 'react'
import PropTypes from 'prop-types'
import css from './StepIndicator.module.css'

const StepIndicator = ({ current, size }) => {
  const displayStep = () => {
    if (current < 1) {
      return 1
    } else if (current > size) {
      return size
    } else {
      return current
    }
  }

  return (
    <div className={css.steps}>
      <p>
        Step&nbsp;
        {displayStep()}
        &nbsp;of&nbsp;
        {size}
      </p>
    </div>
  )
}

StepIndicator.propTypes = {
  current: PropTypes.number,
  size: PropTypes.number,
}

StepIndicator.defaultProps = {
  current: 1,
  size: 1,
}

export { StepIndicator }
