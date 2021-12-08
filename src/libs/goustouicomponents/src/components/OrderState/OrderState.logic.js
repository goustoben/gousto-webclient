import React from 'react'
import PropTypes from 'prop-types'
import css from './OrderState.module.css'

const stateColors = {
  cancelled: 'red',
  confirmed: 'green',
  delivered: 'green',
  dispatched: 'green',
  'menu open': 'orange',
  'recipes chosen': 'green',
  scheduled: 'green',
}

const OrderState = ({
  state,
  testingSelector,
}) => {
  const colorClass = `state--${stateColors[state]}`

  return (
    <div
      className={`${css.state} ${css[colorClass]}`}
      data-testing={testingSelector}
    >
      {state}
    </div>
  )
}

OrderState.propTypes = {
  state: PropTypes.oneOf([
    'cancelled',
    'confirmed',
    'delivered',
    'dispatched',
    'menu open',
    'recipes chosen',
    'scheduled',
  ]).isRequired,
  testingSelector: PropTypes.string,
}

OrderState.defaultProps = {
  testingSelector: null,
}

export { OrderState, stateColors }
