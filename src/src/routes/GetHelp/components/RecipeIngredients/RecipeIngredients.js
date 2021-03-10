import React from 'react'
import PropTypes from 'prop-types'
import { Alert, InputCheck } from 'goustouicomponents'
import { recipePropType } from '../../getHelpPropTypes'
import css from './RecipeIngredients.module.css'

const renderEligibleIngredients = (eligibleIngredients, onChange, recipe, selectedIngredients) => (
  eligibleIngredients.map(ingredient => {
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
  })
)

const renderIneligibleIngredients = (ineligibleIngredients, recipe ) => (
  Boolean(ineligibleIngredients.length)
    && (
      <div className={css.ineligibleIngredientsWrapper}>
        <Alert type="info">
          <h2 className={css.alertTitle}>Supply issues</h2>
          <p>
            {
              `Unfortunately we had issues with the following ingredients
              so we've added credit to your account. Please check your email for more details.`
            }
          </p>
        </Alert>
        {
          ineligibleIngredients.map((ingredient) => {
            const ingredientFullId = `${recipe.id}&${ingredient.uuid}`

            return (
              <div data-testing="getHelpIngredientInputCheck" key={ingredient.uuid}>
                <InputCheck
                  id={ingredientFullId}
                  label={ingredient.label}
                  disabled
                />
              </div>
            )
          })
        }
      </div>
    )
)

const RecipeIngredients = ({ ineligibleIngredientUuids, onChange, recipe, selectedIngredients }) => {
  const eligible = []
  const ineligible = []

  recipe.ingredients.forEach(ingredient => {
    if (ineligibleIngredientUuids.includes(ingredient.uuid)) {
      return ineligible.push(ingredient)
    }

    return eligible.push(ingredient)
  })

  return (
    <div>
      {renderEligibleIngredients(eligible, onChange, recipe, selectedIngredients)}
      {renderIneligibleIngredients(ineligible, recipe)}
    </div>
  )
}

RecipeIngredients.propTypes = {
  ineligibleIngredientUuids: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipe: recipePropType,
  onChange: PropTypes.func.isRequired,
  selectedIngredients: PropTypes.instanceOf(Map).isRequired,
}

RecipeIngredients.defaultProps = {
  recipe: { id: '', title: '', ingredients: [], url: '' }
}

export { RecipeIngredients }
