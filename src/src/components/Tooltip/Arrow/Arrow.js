import React from 'react'
import PropTypes from 'prop-types'

import css from './Arrow.css'

const Arrow = ({ position, orientation }) => (
  (position === orientation) ? (
    <div className={css.arrow__container}>
      <div className={`${css.arrow} ${css[`arrow--${orientation}`]}`} />
    </div>
  ) : null
)

Arrow.defaultProps = {
  position: 'top',
  orientation: 'top',
}

Arrow.propTypes = {
  position: PropTypes.string,
  orientation: PropTypes.string,
}

export {
  Arrow,
}
