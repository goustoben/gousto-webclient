import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import css from './BottomBar.css'

const BottomBar = ({ children, className }) => (
	<div className={classnames(css.bottomBar, className)}>
		{children}
	</div>
)

BottomBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
}

BottomBar.defaultProps = {
  className: '',
}

export default BottomBar
