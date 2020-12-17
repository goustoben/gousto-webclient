import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import css from './SubIngredients.css'

const HARDCODED_ALLERGENS = [
  'celery', 'celeriac', 'wheat', 'rye',
  'barley', 'oats', 'oat', 'oatmeal',
  'spelt', 'kamut', 'crustacean',
  'egg', 'eggs', 'fish', 'lupin', 'milk',
  'mollusc', 'mustard', 'almond', 'almonds',
  'hazelnut', 'hazelnuts', 'cashew nut', 'cashew nuts',
  'pecan nut', 'pecan nuts', 'pecans',
  'brazil nut', 'brazil nuts',
  'pistachio nut', 'pistachio nuts', 'pistachios',
  'macadmaia nut', 'macadamia nuts', 'macadmamias',
  'queensland nut', 'walnut', 'walnuts',
  'peanut', 'peanuts', 'sesame',
  'soy', 'soya', 'sulphites', 'sulphur dioxide',
  'nuts'
]

export const isAllergen = (allergens, subIngredient) => {
  const lowercaseIngredient = subIngredient.toLowerCase()

  if (allergens.some(allergen => allergen.toLowerCase().includes(lowercaseIngredient))) {
    return true
  }

  return HARDCODED_ALLERGENS.includes(lowercaseIngredient)
}

const SubIngredients = ({ subIngredients, allergens }) => (
  <span>
    {subIngredients.map((subIngredient, index) => {
      if (isAllergen(allergens, subIngredient)) {
        return <span key={subIngredient + index} className={css.bold}>{subIngredient}</span>
      }

      return <span key={subIngredient + index}>{subIngredient}</span>
    })}
  </span>
)

SubIngredients.propTypes = {
  subIngredients: PropTypes.array.isRequired,
  allergens: PropTypes.instanceOf(Immutable.List).isRequired,
}

export { SubIngredients }
