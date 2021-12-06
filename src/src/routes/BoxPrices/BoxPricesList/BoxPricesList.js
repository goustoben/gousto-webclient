import PropTypes from 'prop-types'
import React from 'react'
import { withError } from 'utils/withError'
import { BoxPriceBlock } from '../BoxPriceBlock'
import { BoxDescriptorsPropType } from '../boxPricesPropTypes'
import css from './BoxPriceList.css'

const BoxPricesList = ({ numPersonsToBoxDescriptors, boxPricesBoxSizeSelected }) => (
  <div className={css.boxPriceList}>
    {Object.entries(numPersonsToBoxDescriptors).map(([numPersonsStr, boxDescriptors]) => {
      const key = `box-type-${numPersonsStr}`
      const numPersons = parseInt(numPersonsStr, 10)

      return (
        <BoxPriceBlock
          key={key}
          numPersons={numPersons}
          boxInfo={boxDescriptors}
          boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
        />
      )
    })}
  </div>
)

BoxPricesList.propTypes = {
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  boxPricesBoxSizeSelected: PropTypes.func,
}

BoxPricesList.defaultProps = {
  numPersonsToBoxDescriptors: {},
  boxPricesBoxSizeSelected: () => {},
}

export const BoxPricesListComponent = withError(BoxPricesList)
