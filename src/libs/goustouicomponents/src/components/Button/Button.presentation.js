import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from '../Segment'
import { Tooltip } from '../Tooltip'
import { Spinner } from '../Spinner'

const propTypes = {
  spinnerColor: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.oneOf([
      PropTypes.instanceOf(Segment),
      PropTypes.instanceOf(Tooltip),
    ]),
    PropTypes.arrayOf([
      PropTypes.instanceOf(Segment),
      PropTypes.instanceOf(Tooltip),
    ]),
    PropTypes.node,
  ]).isRequired,
  computedKey: PropTypes.number.isRequired,
  spanClassName: PropTypes.string.isRequired,
  spinnerClassNames: PropTypes.string.isRequired,
  dataTesting: PropTypes.string.isRequired,
}

const ButtonPresentation = ({
  children,
  className,
  spanClassName,
  spinnerClassNames,
  spinnerColor,
  color,
  computedKey,
  dataTesting,
}) => (
  <div
    key={computedKey}
    className={className}
  >
    <Segment
      data-testing={dataTesting.length ? `${dataTesting}Spinner` : null}
      spinner
      className={spinnerClassNames}
      color={color}
    >
      <span className={spanClassName}>
        <Spinner color={spinnerColor} />
      </span>
    </Segment>
    {children}
  </div>
)

ButtonPresentation.propTypes = propTypes

export {
  ButtonPresentation,
}
