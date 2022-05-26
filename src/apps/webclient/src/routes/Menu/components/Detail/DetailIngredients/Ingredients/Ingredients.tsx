import React from 'react'

import Immutable from 'immutable'

import { Ingredient } from './Ingredient'

import css from './Ingredients.css'

type IngredientsProps = {
  ingredients: Immutable.List<Immutable.Map<string, any>>
  inset: boolean
}
const Ingredients = ({ ingredients, inset }: IngredientsProps) => (
  <div>
    <div className={inset ? css.insetHeading : ''}>
      <span className={css.heading}>In your box</span>
      <div className={css.leadingText}>
        Ingredients for 2 people
        <span className={css.highlightText}>(double for 4)</span>
      </div>
    </div>
    <div className={css.ingredientsContainer}>
      {ingredients.map((ingredient) => (
        <div className={css.ingredient} key={ingredient && ingredient.get('id')}>
          {ingredient && <Ingredient ingredient={ingredient} />}
        </div>
      ))}
    </div>
  </div>
)

export { Ingredients }
