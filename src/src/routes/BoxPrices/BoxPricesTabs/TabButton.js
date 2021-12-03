import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { onEnter } from 'utils/accessibility'
import css from './BoxPricesTabs.module.css'

export const TabButton = ({ text, isActive, onClick }) => (
  <div
    tabIndex={0}
    role="button"
    className={classNames(css.tab, { [css.tabActive]: isActive })}
    onClick={onClick}
    onKeyPress={onEnter(onClick)}
  >
    {text}
  </div>
)

TabButton.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}
