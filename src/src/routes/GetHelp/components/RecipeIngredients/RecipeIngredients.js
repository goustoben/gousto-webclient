import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Alert, InputCheck } from 'goustouicomponents'
import { recipePropType } from '../../getHelpPropTypes'
import css from './RecipeIngredients.module.css'

const renderEligibleIngredients = (eligibleIngredients, onChange, recipe, selectedIngredients) => (
  eligibleIngredients.map(ingredient => {
    const ingredientFullId = `${recipe.id}&${ingredient.uuid}`
    const isChecked = selectedIngredients.get(ingredientFullId) || false
    const ingredientName = ingredient.label

    return (
      <div data-testing="getHelpIngredientInputCheck" key={ingredient.uuid}>
        <InputCheck
          id={ingredientFullId}
          label={ingredientName}
          defaultValue={isChecked}
          onChange={(checkboxId, isIngredientChecked) => {
            onChange(checkboxId, isIngredientChecked, ingredientName)
          }}
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

const RecipeIngredients = ({
  ineligibleIngredientUuids,
  onChange,
  recipe,
  selectedIngredients,
  trackMassIssueAlertDisplayed,
}) => {
  const isEligible = (bool) => ({ uuid }) => ineligibleIngredientUuids.includes(uuid) !== bool

  const eligible = recipe.ingredients.filter(isEligible(true))
  const ineligible = recipe.ingredients.filter(isEligible(false))
  const hasIneligibleIngredients = Boolean(ineligible.length)

  useEffect(() => {
    if (hasIneligibleIngredients) {
      trackMassIssueAlertDisplayed()
    }
  }, [hasIneligibleIngredients]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {renderEligibleIngredients(eligible, onChange, recipe, selectedIngredients)}
      {renderIneligibleIngredients(ineligible, recipe)}
    </div>
  )
}

RecipeIngredients.propTypes = {
  ineligibleIngredientUuids: PropTypes.arrayOf(PropTypes.string),
  recipe: recipePropType,
  onChange: PropTypes.func.isRequired,
  selectedIngredients: PropTypes.instanceOf(Map).isRequired,
  trackMassIssueAlertDisplayed: PropTypes.func.isRequired,
}

RecipeIngredients.defaultProps = {
  ineligibleIngredientUuids: [],
  recipe: { id: '', title: '', ingredients: [] }
}

export { RecipeIngredients }
