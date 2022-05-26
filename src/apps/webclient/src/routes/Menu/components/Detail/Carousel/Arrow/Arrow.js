import React from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import Icon from 'components/Icon'

import css from './Arrow.css'

const Arrow = ({ direction, onClick }) => (
  <button className={classnames(css.arrow, css[direction])} onClick={onClick} type="button">
    <Icon name={`fa-chevron-${direction}`} aria-hidden="true" />
  </button>
)

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

Arrow.defaultProps = {
  onClick: () => {},
}
export { Arrow }
