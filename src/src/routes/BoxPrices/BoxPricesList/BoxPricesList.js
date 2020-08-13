import PropTypes from 'prop-types'
import React from 'react'
import withError from 'utils/withError'
import classNames from 'classnames'
import BoxPrice from '../BoxPrice'
import { BoxType } from '../BoxType/BoxType'
import css from './BoxPriceList.css'

const groupBy = (collection, key) => collection.reduce((accumulator, currentValue) => {
  (accumulator[currentValue[key]] = accumulator[currentValue[key]] || []).push(currentValue)

  return accumulator
}, {})

const BoxPricesList = ({ boxPrices, type, isBoxPricesPageRedesignEnabled, basketNumPortionChange, goToStep }) => {
  const boxTypes = boxPrices[type]
  const groupByNumPerson = groupBy(boxTypes, 'num_persons')

  return (
    <div className={classNames(css.boxPriceList, {[css.boxPriceRedesign]: isBoxPricesPageRedesignEnabled})}>
      {Object.keys(groupByNumPerson)
        .filter(numPersons => numPersons !== '8')
        .map((numPersons) => {
          const boxProps = {
            key: `box-type-${numPersons}`,
            numPersons: parseInt(numPersons, 10),
            boxInfo: groupByNumPerson[numPersons],
            goToStep,
            basketNumPortionChange
          }

          return isBoxPricesPageRedesignEnabled ? <BoxType {...boxProps} /> : <BoxPrice {...boxProps} />
        })}
    </div>
  )
}

BoxPricesList.propTypes = {
  boxPrices: PropTypes.oneOfType([PropTypes.object]),
  type: PropTypes.oneOf(['gourmet', 'vegetarian']),
  isBoxPricesPageRedesignEnabled: PropTypes.bool,
  goToStep: PropTypes.func,
  basketNumPortionChange: PropTypes.func
}

BoxPricesList.defaultProps = {
  boxPrices: null,
  type: 'gourmet',
  isBoxPricesPageRedesignEnabled: false,
  goToStep: () => {},
  basketNumPortionChange: () => {}
}

export default withError(BoxPricesList)
