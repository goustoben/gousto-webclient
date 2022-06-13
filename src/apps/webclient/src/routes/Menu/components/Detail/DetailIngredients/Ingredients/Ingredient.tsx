import React from 'react'

import Immutable from 'immutable'

import { IngredientImage } from './IngredientImage'

import css from './Ingredient.css'

type IngredientProps = {
  ingredient: Immutable.Map<string, any>
}

const Ingredient = ({ ingredient }: IngredientProps) => (
  <div className={css.ingredient}>
    <div className={css.imageContainer}>
      <IngredientImage ingredient={ingredient} />
    </div>
    <div className={css.label}>
      <span>{ingredient.get('label')}</span>
    </div>
  </div>
)

export { Ingredient }
