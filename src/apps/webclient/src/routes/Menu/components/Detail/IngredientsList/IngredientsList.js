import React from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { SubIngredients } from '../SubIngredients/SubIngredients'

import css from './IngredientsList.css'

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const IngredientsList = ({ ingredients, allergens }) => (
  <div>
    {ingredients.size > 0 ? (
      <div className={css.insetSection}>
        <div className={css.heading}>Ingredients contain</div>
        {ingredients.toArray().map((ingredient) => {
          const subIngredients = ingredient.get('subIngredients')

          const name = ingredient.get('name')

          if (!subIngredients) return <span key={name} />

          return (
            <dl key={name}>
              <span className={css.bold}>{capitalizeFirstLetter(name)}: </span>
              <SubIngredients
                className={css.paragraph}
                subIngredients={subIngredients}
                allergens={allergens}
              />
            </dl>
          )
        })}
      </div>
    ) : (
      <span />
    )}
  </div>
)

IngredientsList.propTypes = {
  ingredients: PropTypes.instanceOf(Immutable.List).isRequired,
  allergens: PropTypes.instanceOf(Immutable.List).isRequired,
}
