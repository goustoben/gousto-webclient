import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { headingAvailableTypes } from '../Heading/Heading.logic'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  hasFullWidth: PropTypes.bool,
  headingType: PropTypes.oneOf(headingAvailableTypes),
}

const defaultProps = {
  hasFullWidth: false,
  headingType: headingAvailableTypes[1],
}

const VerticalStages = ({ children, headingType, hasFullWidth }) => {
  const numberOfSteps = Children.count(children)

  return (
    <div>
      {
        Children.map(children, (child, index) => {
          const isLastStep = index === (numberOfSteps - 1)

          return (
            <div className="verticalStagesWrapper">
              {cloneElement(child, {
                hasFullWidth: hasFullWidth && isLastStep,
                isLastStep,
                stepNumber: index + 1,
                headingType,
              })}
            </div>
          )
        })
      }
    </div>
  )
}

VerticalStages.propTypes = propTypes
VerticalStages.defaultProps = defaultProps

export {
  VerticalStages,
}
