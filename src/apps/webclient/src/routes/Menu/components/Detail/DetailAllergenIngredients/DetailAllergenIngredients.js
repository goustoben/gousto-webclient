import React from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { Allergens } from '../Allergens/Allergens'
import { IngredientsList } from '../IngredientsList/IngredientsList'

import css from '../Detail.css'

const DetailAllergenIngredients = ({ allergens, ingredients }) => {
  if (!ingredients.size) {
    return null
  }

  return (
    <div className={css.sectionPanel}>
      <IngredientsList ingredients={ingredients} allergens={allergens} />
      <Allergens allergens={allergens} />
    </div>
  )
}

DetailAllergenIngredients.propTypes = {
  ingredients: PropTypes.instanceOf(Immutable.List),
  allergens: PropTypes.instanceOf(Immutable.List),
}
DetailAllergenIngredients.defaultProps = {
  ingredients: Immutable.List([]),
  allergens: PropTypes.instanceOf(Immutable.List),
}

export { DetailAllergenIngredients }
