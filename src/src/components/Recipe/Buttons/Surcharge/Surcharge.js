import PropTypes from 'prop-types'
import React from 'react'
import css from './Surcharge.css'

const Surcharge = ({ surcharge }) => (
  surcharge > 0 && (
    <div className={css.surcharge}>
      +&pound;{surcharge.toFixed(2)} per serving
    </div>
  )
)

Surcharge.propTypes = {
  surcharge: PropTypes.number.isRequired,
}

export default Surcharge
