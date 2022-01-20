import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'goustouicomponents'
import css from './HeadingWithSeparator.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'bottom',
    'top',
  ]),
}
const defaultProps = {
  position: 'bottom'
}

const HeadingWithSeparator = ({ children, position }) => (
  <div>
    {(position === 'top') && <div className={css.line} />}
    <div className={css.heading}>
      <Heading
        size="fontStyleL"
        type="h4"
        hasMargin
      >
        {children}
      </Heading>
    </div>
    {(position === 'bottom') && <div className={css.line} />}
  </div>
)

HeadingWithSeparator.defaultProps = defaultProps
HeadingWithSeparator.propTypes = propTypes

export {
  HeadingWithSeparator
}
