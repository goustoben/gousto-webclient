import React from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import menu from 'config/menu'

import css from './Allergens.css'

const replaceGluten = (allergens) =>
  allergens.map((a) => (a === 'gluten' ? 'cereals containing gluten' : a))

export const allergenNamesInParentheses = (allergens) => {
  const allergenString = replaceGluten(allergens).join(', ')
  const allergenText = `(${allergenString})`

  return allergenText
}

const Allergens = ({ allergens }) => (
  <div className={css.insetSection}>
    <h1 className={css.heading}>Allergens</h1>
    {allergens.size > 0 ? (
      <dl>
        <span data-testing="allergen">
          For allergens, see ingredients in
          <span className={css.bold}> BOLD. </span>
          <span className={css.bold}>{allergenNamesInParentheses(allergens)}</span>
        </span>
      </dl>
    ) : null}
    <p>{menu.legal}</p>
  </div>
)

Allergens.propTypes = {
  allergens: PropTypes.instanceOf(Immutable.List).isRequired,
}

export { Allergens }
