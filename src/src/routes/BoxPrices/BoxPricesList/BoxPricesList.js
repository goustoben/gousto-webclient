import PropTypes from 'prop-types'
import React from 'react'
import withError from 'utils/withError'
import { BoxPriceBlock } from '../BoxPrice'
import { groupBy } from './boxPricesListUtils'
import css from './BoxPriceList.css'

const BoxPricesList = ({
  boxPrices,
  type,
  boxPricesBoxSizeSelected,
}) => {
  const boxTypes = boxPrices[type]
  const groupByNumPerson = boxTypes && groupBy(boxTypes, 'num_persons')

  return (
    <div className={css.boxPriceList}>
      {Object.keys(groupByNumPerson)
        .filter((numPersons) => numPersons !== '8')
        .map((numPersonsStr) => {
          const key = `box-type-${numPersonsStr}`
          const numPersons = parseInt(numPersonsStr, 10)
          const boxInfo = groupByNumPerson[numPersonsStr]

          return (
            <BoxPriceBlock
              key={key}
              numPersons={numPersons}
              boxInfo={boxInfo}
              boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
            />
          )
        })}
    </div>
  )
}

BoxPricesList.propTypes = {
  boxPrices: PropTypes.shape({}),
  type: PropTypes.oneOf(['gourmet', 'vegetarian']),
  boxPricesBoxSizeSelected: PropTypes.func,
}

BoxPricesList.defaultProps = {
  boxPrices: {},
  type: 'gourmet',
  boxPricesBoxSizeSelected: () => {},
}

export const BoxPricesListComponent = withError(BoxPricesList)
