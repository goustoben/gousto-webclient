/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import css from './SubIngredients.module.css'

const newLineString = 'NEWLINE'
const REGEX_TO_SPLIT_SENTENCES = /([A-Za-zÀ-ÖØ-öø-ÿ]+)|\s+|[^\sA-Za-zÀ-ÖØ-öø-ÿ]+/g

const splitSentences = (string) => string.replace(/\n/g, ` ${newLineString} `).match(REGEX_TO_SPLIT_SENTENCES)

// We maintain these like this as this is how allergies are communicated to us
const HARDCODED_ALLERGENS = [
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
  .filter((v, i, a) => a.indexOf(v) === i)

const isAllergen = (allergens, subIngredient) => {
  const lowercaseIngredient = subIngredient.toLowerCase()
  const isInAllergensList = allergens.includes(lowercaseIngredient)

  return (isInAllergensList || HARDCODED_ALLERGENS.includes(lowercaseIngredient))
}

const SubIngredients = ({ subIngredients, allergens, className }) => {
  const subIngredientsArray = React.useMemo(() => splitSentences(subIngredients), [subIngredients])

  return (
    <p className={className}>
      {subIngredientsArray.map((subIngredient, index) => {
        if (isAllergen(allergens, subIngredient)) {
          return <span key={subIngredient + index} className={css.bold}>{subIngredient}</span>
        }

        if (subIngredient === newLineString) {
          return <br key={subIngredient + index} />
        }

        return subIngredient
      })}
    </p>
  )
}

SubIngredients.propTypes = {
  className: PropTypes.string,
  subIngredients: PropTypes.string.isRequired,
  allergens: PropTypes.instanceOf(Immutable.List).isRequired,
}

SubIngredients.defaultProps = {
  className: '',
}

export { SubIngredients }
