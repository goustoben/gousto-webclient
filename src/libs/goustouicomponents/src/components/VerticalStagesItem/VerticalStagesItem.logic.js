import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './VerticalStagesItem.module.css'

import { Heading } from '../Heading'
import { headingAvailableTypes } from '../Heading/Heading.logic'

const backgroundColorsAvailable = [
  'transparent',
  'lightGrey',
  'white',
]

const propTypes = {
  backgroundColor: PropTypes.oneOf(backgroundColorsAvailable),
  children: PropTypes.node,
  extraClass: PropTypes.string,
  isCompleted: PropTypes.bool,
  title: PropTypes.node.isRequired,
  /** Should be provided by the VerticalStages component */
  hasFullWidth: PropTypes.bool,
  headingType: PropTypes.oneOf(headingAvailableTypes),
  isLastStep: PropTypes.bool,
  stepNumber: PropTypes.number,
}

const defaultProps = {
  backgroundColor: 'transparent',
  children: null,
  extraClass: null,
  hasFullWidth: false,
  headingType: headingAvailableTypes[1],
  isCompleted: false,
  isLastStep: false,
  stepNumber: 1,
}

const VerticalStagesItem = ({
  backgroundColor,
  children,
  extraClass,
  hasFullWidth,
  headingType,
  isCompleted,
  isLastStep,
  stepNumber,
  title,
}) => (
  <div
    className={classnames(
      css.wrapper,
      css[`wrapper--${backgroundColor}`],
      {
        [css.isCompleted]: isCompleted,
        [css['wrapper--fullWidth']]: hasFullWidth,
      },
    )}
  >
    <div className={css.topContentWrapper}>
      <div className={classnames(css.stepNumberWrapper, {
        [css.firstStep]: stepNumber === 1,
        [css.lastStep]: isLastStep,
      })}
      >
        <span className={css.stepNumber}>
          {isCompleted ? <span className={css.tickIcon} /> : stepNumber}
        </span>
        <span className={css.lineBelowNumber} />
      </div>
      <div className={css.contentWrapper}>
        <div className={classnames(css.verticalStagesItem, extraClass)}>
          <Heading size="_legacy_large" type={headingType}>{title}</Heading>
          {(!hasFullWidth) && <div className={css.contentDefaultWidth}>{children}</div>}
        </div>
      </div>
    </div>
    {
      hasFullWidth
      && (
        <div className={classnames(
          css.verticalStagesItem,
          css.contentFullWidth,
        )}
        >
          {children}
        </div>
      )
    }
  </div>
)

VerticalStagesItem.propTypes = propTypes
VerticalStagesItem.defaultProps = defaultProps

export {
  backgroundColorsAvailable,
  VerticalStagesItem,
}
