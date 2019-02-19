import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import Icon from 'Icon'
import css from './Arrow.css'

const Arrow = ({ direction, onClick }) => (
	<button
	  className={classnames(css.arrow, css[direction])}
	  onClick={onClick}
	>
		<Icon
		  name={`fa-chevron-${direction}`}
		  aria-hidden="true"
		/>
	</button>
)

Arrow.propTypes = {
  direction: PropTypes.string,
  action: PropTypes.string,
  onClick: PropTypes.func,
}

export default Arrow
