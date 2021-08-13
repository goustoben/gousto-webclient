import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import css from './BoxPrices.css'

export const SelectButton = ({ text, selectedBox, setSelectedBox, index }) => (
  <span
    role="button"
    tabIndex={-1}
    className={classNames(css.tab, selectedBox === index ? css.tabActive : false)}
    onClick={() => setSelectedBox(index)}
    onKeyPress={() => setSelectedBox(index)}
  >
    {text}
  </span>
)

SelectButton.propTypes = {
  text: PropTypes.string.isRequired,
  selectedBox: PropTypes.number.isRequired,
  setSelectedBox: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}
