import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Alert, InputCheck, InfoTip } from 'goustouicomponents'
import { recipePropType } from '../../getHelpPropTypes'
import css from './RecipeIngredients.module.css'

const renderIngredients = (eligibleIngredients, onChange, recipe, selectedIngredients, otherIssueIneligibleIngredientUuids) => (
  eligibleIngredients.map(ingredient => {
    const ingredientFullId = `${recipe.id}&${ingredient.uuid}`
    const isChecked = selectedIngredients.get(ingredientFullId) || false
    const ingredientName = ingredient.label
    const isIneligible = otherIssueIneligibleIngredientUuids.includes(ingredient.uuid)

    return (
      <div data-testing="getHelpIngredientInputCheck" key={ingredient.uuid}>
        <InputCheck
          id={ingredientFullId}
          label={ingredientName}
          defaultValue={isChecked}
          disabled={isIneligible}
          onChange={(checkboxId, isIngredientChecked) => {
            onChange(checkboxId, isIngredientChecked, ingredientName)
          }}
        />
        {isIneligible && (
        <div className={css.ineligibleIngredientsInfoTip}>
          <InfoTip isCloseIconVisible={false} color="lightGrey" position="relative">
            You have previously been compensated for this ingredient across all recipes.
          </InfoTip>
        </div>
        )}
      </div>
    )
  })
)

const renderMassIssueIngredients = (ineligibleIngredients, recipe) => (
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
  massIssueIneligibleIngredientUuids,
  onChange,
  otherIssueIneligibleIngredientUuids,
  recipe,
  selectedIngredients,
  trackMassIssueAlertDisplayed,
}) => {
  const isEligible = (bool) => ({ uuid }) => massIssueIneligibleIngredientUuids.includes(uuid) !== bool

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
      {renderIngredients(eligible, onChange, recipe, selectedIngredients, otherIssueIneligibleIngredientUuids)}
      {renderMassIssueIngredients(ineligible, recipe)}
    </div>
  )
}

RecipeIngredients.propTypes = {
  massIssueIneligibleIngredientUuids: PropTypes.arrayOf(PropTypes.string),
  recipe: recipePropType,
  onChange: PropTypes.func.isRequired,
  otherIssueIneligibleIngredientUuids: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIngredients: PropTypes.instanceOf(Map).isRequired,
  trackMassIssueAlertDisplayed: PropTypes.func.isRequired,
}

RecipeIngredients.defaultProps = {
  massIssueIneligibleIngredientUuids: [],
  recipe: { id: '', title: '', ingredients: [] }
}

export { RecipeIngredients }
