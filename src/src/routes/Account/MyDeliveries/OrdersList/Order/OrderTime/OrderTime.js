import PropTypes from 'prop-types'
import React from 'react'
import css from './OrderTime.module.css'

const OrderTime = ({ start, end }) => (
  <p className={css.time}>
    {start}
    {' '}
    -
    {' '}
    {end}
  </p>
)

OrderTime.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
}

OrderTime.defaultProps = {
  start: '',
  end: '',
}

export default OrderTime
