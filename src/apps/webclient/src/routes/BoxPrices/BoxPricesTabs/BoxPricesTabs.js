import React from 'react'

import PropTypes from 'prop-types'

import { TabButton } from './TabButton'

import css from './BoxPricesTabs.css'

export const BoxPricesTabs = ({ labels, activeIndex, setActiveIndex }) => (
  <div className={css.tabs}>
    {labels.map((label, index) => (
      <TabButton
        key={label}
        text={label}
        isActive={activeIndex === index}
        onClick={() => setActiveIndex(index)}
      />
    ))}
  </div>
)

BoxPricesTabs.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
}
