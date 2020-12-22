import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import css from './CarouselArrow.css'

export const Arrow = ({ side, ...props }) => (
  <button
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...props}
    type="button"
    tabIndex="0"
    className={classNames(css.arrow, css[side])}
  />
)

Arrow.propTypes = {
  side: PropTypes.string.isRequired,
}
