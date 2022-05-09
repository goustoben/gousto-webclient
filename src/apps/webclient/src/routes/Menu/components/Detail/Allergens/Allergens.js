import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import menu from 'config/menu'
import css from './Allergens.css'

const replaceGluten = (allergens) =>
  allergens.map((a) => (a === 'gluten' ? 'cereals containing gluten' : a))

export const allergenNamesInParentheses = (allergens) => {
  const allergenString = replaceGluten(allergens).join(', ')
  const allergenText = `(${allergenString})`

  return allergenText
}

const Allergens = ({ allergens, inset }) => (
  <div className={inset ? css.insetSection : css.section}>
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
  inset: PropTypes.bool,
}

Allergens.defaultProps = {
  inset: true,
}

export { Allergens }
