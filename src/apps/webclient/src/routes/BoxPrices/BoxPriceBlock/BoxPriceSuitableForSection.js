import React from 'react'
import PropTypes from 'prop-types'
import { boxTypesRedesign } from 'routes/BoxPrices/boxPricesConfig'
import css from './BoxPriceBlock.css'

export const BoxPriceSuitableForSection = ({ numPersons }) => {
  const boxTypeConfig = boxTypesRedesign[numPersons]

  return (
    <React.Fragment>
      <p className={css.subhead}>{boxTypeConfig.subhead}</p>
      <ul className={css.list}>
        {boxTypeConfig.suitable.map((label) => (
          <li key={`for-${label}`} className={css.listItem}>
            {label}
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

BoxPriceSuitableForSection.propTypes = {
  numPersons: PropTypes.number.isRequired,
}
