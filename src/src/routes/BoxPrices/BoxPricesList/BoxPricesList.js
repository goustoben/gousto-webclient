import PropTypes from 'prop-types'
import React from 'react'
import withError from 'utils/withError'
import classNames from 'classnames'
import BoxPrice from '../BoxPrice'
import { BoxType } from '../BoxType/BoxType'
import { groupBy } from './boxPricesListUtils'
import css from './BoxPriceList.css'

const BoxPricesList = ({
  boxPrices,
  type,
  isBoxPricesPageRedesignEnabled,
  isBoxPricesUserJourneyEnabled,
  basketNumPortionChange,
  goToStep,
  boxPricesBoxSizeSelected
}) => {
  const boxTypes = boxPrices[type]
  const groupByNumPerson = groupBy(boxTypes, 'num_persons')

  return (
    <div
      className={classNames(css.boxPriceList, {
        [css.boxPriceRedesign]: isBoxPricesPageRedesignEnabled
      })}
    >
      {Object.keys(groupByNumPerson)
        .filter((numPersons) => numPersons !== '8')
        .map((numPersonsStr) => {
          const key = `box-type-${numPersonsStr}`
          const numPersons = parseInt(numPersonsStr, 10)
          const boxInfo = groupByNumPerson[numPersonsStr]

          return isBoxPricesPageRedesignEnabled ? (
            <BoxType
              key={key}
              numPersons={numPersons}
              boxInfo={boxInfo}
              basketNumPortionChange={basketNumPortionChange}
              goToStep={goToStep}
            />
          ) : (
            <BoxPrice
              key={key}
              numPersons={numPersons}
              boxInfo={boxInfo}
              isBoxPricesUserJourneyEnabled={isBoxPricesUserJourneyEnabled}
              boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
            />
          )
        })}
    </div>
  )
}

BoxPricesList.propTypes = {
  boxPrices: PropTypes.oneOfType([PropTypes.object]),
  type: PropTypes.oneOf(['gourmet', 'vegetarian']),
  isBoxPricesPageRedesignEnabled: PropTypes.bool,
  isBoxPricesUserJourneyEnabled: PropTypes.bool,
  goToStep: PropTypes.func,
  basketNumPortionChange: PropTypes.func,
  boxPricesBoxSizeSelected: PropTypes.func
}

BoxPricesList.defaultProps = {
  boxPrices: null,
  type: 'gourmet',
  isBoxPricesPageRedesignEnabled: false,
  isBoxPricesUserJourneyEnabled: false,
  goToStep: () => {},
  basketNumPortionChange: () => {},
  boxPricesBoxSizeSelected: () => {}
}

export default withError(BoxPricesList)
