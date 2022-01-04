import PropTypes from 'prop-types'
import React from 'react'
import { withError } from 'utils/withError'
import { BoxPriceBlock } from '../BoxPriceBlock/BoxPriceBlockRedesign'
import { BoxDescriptorsPropType } from '../boxPricesPropTypes'
import css from './BoxPriceList.css'

const BoxPricesListRedesign = ({
  numPersonsToBoxDescriptors,
  boxPricesBoxSizeSelected,
  selectedBox,
  trackUTMAndPromoCode,
}) => (
  <div className={css.boxPriceListRedesign}>
    {Object.entries(numPersonsToBoxDescriptors).map(([numPersonsStr, boxDescriptors]) => {
      const key = `box-type-${numPersonsStr}`
      const numPersons = parseInt(numPersonsStr, 10)

      return (
        <BoxPriceBlock
          key={key}
          numPersons={numPersons}
          boxInfo={boxDescriptors}
          boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
          selectedBox={selectedBox}
          trackUTMAndPromoCode={trackUTMAndPromoCode}
        />
      )
    })}
  </div>
)

BoxPricesListRedesign.propTypes = {
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  boxPricesBoxSizeSelected: PropTypes.func,
  selectedBox: PropTypes.number.isRequired,
  trackUTMAndPromoCode: PropTypes.func.isRequired,
}

BoxPricesListRedesign.defaultProps = {
  numPersonsToBoxDescriptors: {},
  boxPricesBoxSizeSelected: () => {},
}

const BoxPricesListRedesignContainer = withError(BoxPricesListRedesign)

export { BoxPricesListRedesignContainer }
