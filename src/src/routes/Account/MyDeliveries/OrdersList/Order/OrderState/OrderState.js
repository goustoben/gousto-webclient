import PropTypes from 'prop-types'
import React from 'react'
import css from './OrderState.module.css'

const initcap = (word) => word.charAt(0).toUpperCase() + word.slice(1)
const toCamelCase = (str) => str.replace(/\b\w/g, chr => chr.toUpperCase()).replace(' ', '')

const OrderState = ({ orderState }) => {
  const state = initcap(orderState)
  const iconClass = `icon${toCamelCase(state)}`
  const stateClass = `state${toCamelCase(state)}`

  return (
    <div className={css.orderStateWrap} data-testing="orderState">
      <span className={css[iconClass]} />
      <p className={css[stateClass]}>{state}</p>
    </div>
  )
}

OrderState.propTypes = {
  orderState: PropTypes.string,
}

OrderState.defaultProps = {
  orderState: '',
}

export default OrderState
