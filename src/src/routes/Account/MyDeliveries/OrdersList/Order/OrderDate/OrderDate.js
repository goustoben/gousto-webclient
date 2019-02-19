import PropTypes from 'prop-types'
import React from 'react'
import css from './OrderDate.css'

const OrderDate = ({ date }) => (
	<p className={css.date}>{date}</p>
)

OrderDate.propTypes = {
  date: PropTypes.string,
}

OrderDate.defaultProps = {
  date: '',
}

export default OrderDate
