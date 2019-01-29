import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import css from './AttributeGrid.css'
import { recipePriorityOrder, detailedRecipePriorityOrder} from './config'
import { RecipeAttribute } from '../RecipeAttribute'

const AttributeGrid = ({maxNoAttributes, showDetailedRecipe, cookingTime, useWithin, equipment, diet, fiveADay, cals, cuisine, dairyFree, glutenFree}) => {

  const attributes = [
    { name: 'cookingTime', value: cookingTime, icon:'icon-time'},
    { name: 'useWithin', value: useWithin, icon:'icon-use-within'},
    { name: 'equipmentRequired', value: equipment, icon:'icon-equipment', show:equipment && equipment.size > 0},
    { name: 'diet', value: diet, icon:'icon-diet', show:['vegetarian', 'vegan'].includes(diet.toLowerCase())},
    { name: 'fiveADay', value: fiveADay, icon:'icon-five-a-day', show:fiveADay > 1},
    { name: 'cals', value: cals, icon:'icon-calories'},
    { name: 'cuisine', value: cuisine, icon:'icon-cuisine'},
    { name: 'glutenFree', value: glutenFree, icon:'icon-gluten-free', show: !!glutenFree},
    { name: 'dairyFree', value: dairyFree, icon:'icon-dairy-free', show: !!dairyFree},
  ]

  const getAttributesInPriorityOrder = priorityOrder => {
    const orderedAttributes = []
    priorityOrder.map(attributeName => {
      orderedAttributes.push(attributes.find(({name}) => name === attributeName))
    })

    return orderedAttributes
  }

  const priorityOrder = showDetailedRecipe ? detailedRecipePriorityOrder : recipePriorityOrder
  const attributesInPriorityOrder = getAttributesInPriorityOrder(priorityOrder)
  let attributeCount = 0

  return (
    <div className={css.attributes}>
      {attributesInPriorityOrder.map(({name, value, icon, show}) => {
        if(show !== false && attributeCount < maxNoAttributes) {
          attributeCount++

          return <RecipeAttribute name={name} value={value} icon={icon} />
        }
      })}
    </div>
  )
}

AttributeGrid.propTypes = {
  maxNoAttributes: PropTypes.number.isRequired,
  showDetailedRecipe: PropTypes.bool,
  cookingTime: PropTypes.number.isRequired,
  useWithin: PropTypes.string.isRequired,
  equipment: PropTypes.instanceOf(Immutable.List),
  diet: PropTypes.string.isRequired,
  fiveADay: PropTypes.number.isRequired,
  cals: PropTypes.number,
  cuisine: PropTypes.string,
  glutenFree: PropTypes.bool,
  dairyFree: PropTypes.bool,
}

AttributeGrid.defaultProps = {
  fiveADay: 0,
}

export { AttributeGrid }
