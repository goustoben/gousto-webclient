import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import css from './AttributeGrid.css'
import { RecipeAttribute } from '../RecipeAttribute'

const AttributeGrid = ({cookingTime, useWithin, equipment, diet, fiveADay}) => {

  const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)

  const attributesInPriorityOrder = [
    {
      name: 'cookingTime',
      value: cookingTime,
      icon:'icon-time'
    },
    {
      name: 'useWithin',
      value: useWithin,
      icon:'icon-use-within'
    },
    {
      name: 'equipmentRequired',
      value: equipment,
      icon:'icon-equipment',
      show:equipment && equipment.length > 0
    },
    {
      name: 'diet',
      value: capitalizeFirstLetter(diet),
      icon:'icon-diet',
      show:['vegetarian', 'vegan'].includes(diet.toLowerCase())
    },
    {
      name: 'fiveADay',
      value: fiveADay,
      icon:'icon-five-a-day',
      show:fiveADay > 1
    },
  ]

  let attributeCount = 0
  console.log('equipment', equipment) //eslint-disable-line

  return (
    <div className={css.attributes}>
      {attributesInPriorityOrder.map(({name, value, icon, show}) => {
        if(show !== false && attributeCount < 4) {
          attributeCount++

          return <RecipeAttribute name={name} value={value} icon={icon} />
        }
      })}
    </div>
  )
}

AttributeGrid.propTypes = {
  cookingTime: PropTypes.number.isRequired,
  useWithin: PropTypes.string.isRequired,
  equipment: PropTypes.instanceOf(Immutable.List),
  diet: PropTypes.string.isRequired,
  fiveADay: PropTypes.number,
}

AttributeGrid.defaultProps = {
  fiveADay: 0,
}

export { AttributeGrid }
