/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import css from './SubIngredients.css'

const HARDCODED_ALLERGENS = [
  ...new Set(
    // We maintain these like this as this is how allergies are communicated to us
    [
      'almond',
      'almonds',
      'barley',
      'brazil nut',
      'brazil nuts',
      'cashew nut',
      'cashew nuts',
      'celeriac',
      'celery',
      'crustacean',
      'egg',
      'eggs',
      'fish',
      'hazelnut',
      'hazelnuts',
      'kamut',
      'lupin',
      'macadamia nuts',
      'macadamia nut',
      'macadamias',
      'milk',
      'mollusc',
      'mustard',
      'nuts',
      'oat',
      'oatmeal',
      'oats',
      'peanut',
      'peanuts',
      'pecan nut',
      'pecan nuts',
      'pecans',
      'pistachio nut',
      'pistachio nuts',
      'pistachios',
      'queensland nut',
      'rye',
      'sesame',
      'soy',
      'soya',
      'spelt',
      'sulphites',
      'sulphur dioxide',
      'walnut',
      'walnuts',
      'wheat',
    ].reduce((words, word) => [...words, ...word.split(' ')], [])
  )
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
  subIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  allergens: PropTypes.instanceOf(Immutable.List).isRequired,
}

export { SubIngredients }
