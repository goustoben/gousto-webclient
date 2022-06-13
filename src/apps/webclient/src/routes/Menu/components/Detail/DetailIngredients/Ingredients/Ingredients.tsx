import React from 'react'

import Immutable from 'immutable'

import { Ingredient } from './Ingredient'

import css from './Ingredients.css'

type IngredientsProps = {
  ingredients: Immutable.List<Immutable.Map<string, any>>
}
const Ingredients = ({ ingredients }: IngredientsProps) => (
  <div>
    <div>
      <div className={css.heading}>In your box</div>
      <div className={css.leadingText}>
        <p>For allergens see the &apos;Ingredients contain&apos; section</p>
        <span>Ingredients for 2 people </span>
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
