import PropTypes from 'prop-types'
import React, { Children } from 'react'
import css from './StepContent.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
}

const StepContent = ({ children, size, step }) => {
  const marginLeft = (step === 1 ? '0' : `-${step - 1}00%`)
  const style = {
    marginLeft,
    width: `${size}00%`,
  }

  return (
    <div className={css.stepsContainer}>
      <div className={css.animationContainer}>
        <div
          className={css.animation}
          style={style}
        >
          {
            Children.map(children, (child, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className={css.step} key={`step-content-${idx}`}>
                {child}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

StepContent.propTypes = propTypes

export { StepContent }
