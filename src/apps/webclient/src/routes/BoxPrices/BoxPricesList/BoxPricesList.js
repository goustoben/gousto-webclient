import React from 'react'

import PropTypes from 'prop-types'

import { boxTypes } from 'routes/BoxPrices/boxPricesConfig'
import { withError } from 'utils/withError'

import { BoxPriceBlock } from '../BoxPriceBlock'
import { BoxDescriptorsPropType } from '../boxPricesPropTypes'

import css from './BoxPriceList.css'

const BoxPricesList = ({
  numPersonsToBoxDescriptors,
  boxPricesBoxSizeSelected,
  selectedBox,
  trackUTMAndPromoCode,
}) => (
  <div className={css.boxPriceList}>
    {Object.entries(numPersonsToBoxDescriptors).map(([numPersonsStr, boxDescriptors]) => {
      const key = `box-type-${numPersonsStr}`
      const numPersons = parseInt(numPersonsStr, 10)
      const boxDescriptorsCopy = boxDescriptors.slice()
      const { boxSizeTrackingValue } = boxTypes[numPersons]

      if (boxSizeTrackingValue === 'large') {
        boxDescriptorsCopy.pop()
      }

      console.log('BoxPrice', boxDescriptorsCopy, boxTypes[numPersons])

      return (
        <BoxPriceBlock
          key={key}
          numPersons={numPersons}
          boxInfo={boxDescriptorsCopy}
          boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
          selectedBox={selectedBox}
          trackUTMAndPromoCode={trackUTMAndPromoCode}
        />
      )
    })}
  </div>
)

BoxPricesList.propTypes = {
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  boxPricesBoxSizeSelected: PropTypes.func,
  selectedBox: PropTypes.number.isRequired,
  trackUTMAndPromoCode: PropTypes.func.isRequired,
}

BoxPricesList.defaultProps = {
  numPersonsToBoxDescriptors: {},
  boxPricesBoxSizeSelected: () => {},
}

export const BoxPricesListContainer = withError(BoxPricesList)
