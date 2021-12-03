import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import css from './AttributeGrid.module.css'
import { recipePriorityOrder, detailedRecipePriorityOrder} from './config'
import { RecipeAttribute } from '../RecipeAttribute'

const AttributeGrid = ({maxNoAttributes, showDetailedRecipe, cookingTime, useWithin, equipment, diet, fiveADay, cals, cuisine, dairyFree, numPortions, glutenFree, fineDineInStyle}) => {
  const attributes = [
    { name: 'cookingTime', value: cookingTime, icon: fineDineInStyle ? 'icon-time-white' : 'icon-time', show: cookingTime !== null },
    { name: 'useWithin', value: useWithin, icon: fineDineInStyle ? 'icon-use-within-white' : 'icon-use-within'},
    { name: 'equipmentRequired', value: equipment, icon: 'icon-equipment', show: Boolean(equipment && equipment.size > 0)},
    { name: 'diet', value: diet, icon: 'icon-diet', show: ['vegetarian', 'vegan'].includes(diet.toLowerCase())},
    { name: 'fiveADay', value: fiveADay, icon: 'icon-five-a-day', show: fiveADay > 0},
    { name: 'cals', value: cals, icon: 'icon-calories'},
    { name: 'cuisine', value: cuisine, icon: 'icon-cuisine'},
    { name: 'glutenFree', value: glutenFree, icon: 'icon-gluten-free', show: Boolean(glutenFree)},
    { name: 'dairyFree', value: dairyFree, icon: 'icon-dairy-free', show: Boolean(dairyFree)},
    { name: 'numPortions', value: numPortions, icon: 'icon-servings', show: Boolean(numPortions) && !fineDineInStyle}
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
    <div className={classnames(css.attributes, { [css.fineDineInStyleBorder]: fineDineInStyle })}>
      {attributesInPriorityOrder.map(({name, value, icon, show}) => {
        if (show !== false && attributeCount < maxNoAttributes) {
          attributeCount += 1

          return <RecipeAttribute key={name} name={name} value={value} icon={icon} />
        }
      })}
    </div>
  )
}

AttributeGrid.propTypes = {
  maxNoAttributes: PropTypes.number.isRequired,
  showDetailedRecipe: PropTypes.bool,
  cookingTime: PropTypes.number,
  useWithin: PropTypes.string.isRequired,
  equipment: PropTypes.instanceOf(Immutable.List),
  diet: PropTypes.string.isRequired,
  fiveADay: PropTypes.number.isRequired,
  cals: PropTypes.number,
  cuisine: PropTypes.string,
  glutenFree: PropTypes.bool,
  dairyFree: PropTypes.bool,
  numPortions: PropTypes.number,
  fineDineInStyle: PropTypes.bool
}

AttributeGrid.defaultProps = {
  cookingTime: null,
  numPortions: null,
  dairyFree: false,
  glutenFree: false,
  fineDineInStyle: false
}

export { AttributeGrid }
