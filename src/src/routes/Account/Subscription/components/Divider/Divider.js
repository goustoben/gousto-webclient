import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import css from './Divider.module.css'

export const Divider = ({ hidden }) => {
  const classNames = classnames(
    css.divider,
    hidden.map(breakpoint => css[`hidden-${breakpoint}`])
  )

  return (<hr className={classNames} />)
}

Divider.propTypes = {
  hidden: PropTypes.arrayOf(PropTypes.oneOf(['sm', 'md', 'lg', 'xl']))
}

Divider.defaultProps = {
  hidden: []
}
