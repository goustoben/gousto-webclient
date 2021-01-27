import React from 'react'
import PropTypes from 'prop-types'
import { InputCheck } from 'goustouicomponents'
import { recipePropType } from '../../getHelpPropTypes'

const RecipeIngredients = ({ onChange, recipe, selectedIngredients }) => (
  <div>
    {recipe.ingredients.map(ingredient => {
      const ingredientFullId = `${recipe.id}&${ingredient.uuid}`
      const isChecked = selectedIngredients.get(ingredientFullId) || false

      return (
        <div data-testing="getHelpIngredientInputCheck" key={ingredient.uuid}>
          <InputCheck
            id={ingredientFullId}
            label={ingredient.label}
            defaultValue={isChecked}
            onChange={onChange}
          />
        </div>
      )
    })}
  </div>
)

RecipeIngredients.propTypes = {
  recipe: recipePropType,
  onChange: PropTypes.func.isRequired,
  selectedIngredients: PropTypes.instanceOf(Map).isRequired,
}

RecipeIngredients.defaultProps = {
  recipe: { id: '', title: '', ingredients: [], url: '' }
}

export { RecipeIngredients }
