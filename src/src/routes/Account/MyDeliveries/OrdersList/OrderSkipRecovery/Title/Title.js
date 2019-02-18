import PropTypes from 'prop-types'
import React from 'react'

import css from './Title.css'

const propTypes = {
  title: PropTypes.string.isRequired,
  orderType: PropTypes.string.isRequired,
}

const defaultProps = {
  title: '',
  orderType: '',
}

const Title = ({ title, orderType }) => {
  const titleCopy = title || `Are you sure you want to ${(orderType === 'pending') ? 'cancel' : 'skip'}?`

  return (
		<div className={css.title}>
			{titleCopy}
		</div>
  )
}

Title.propTypes = propTypes

Title.defaultProps = defaultProps

export default Title
