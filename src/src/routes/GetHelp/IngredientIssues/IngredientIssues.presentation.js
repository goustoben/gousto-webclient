import React from 'react'
import PropTypes from 'prop-types'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { Button, Dropdown } from 'goustouicomponents'
import { BottomButton } from '../components/BottomButton'

import css from './IngredientIssues.css'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  changeHandler: PropTypes.func.isRequired,
  continueHandler: PropTypes.func.isRequired,
  ingredients: PropTypes.objectOf(
    PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
      ingredientId: PropTypes.string.isRequired,
      issueId: PropTypes.string,
      issueName: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ),
  buttonLeftUrl: PropTypes.string,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      requireDescription: PropTypes.bool.isRequired,
    }).isRequired
  ),
  subIssues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      groupLabel: PropTypes.string.isRequired,
      requireDescription: PropTypes.bool.isRequired,
    }).isRequired
  )
}

const defaultProps = {
  ingredients: []
}

const renderIngredientsIssues = (ingredients, issues, subIssues, changeHandler) => {

  const renderedIngredients = Object.keys(ingredients).map((ingredientAndRecipeId) => {
    const optionSelected = issues && issues[0] && issues[0].id
    const ingredientLabel = ingredients[ingredientAndRecipeId].label

    return (
      <div key={ingredientAndRecipeId}>
        <p className={css.ingredientLabel}>{ingredientLabel}</p>
        {optionSelected && <Dropdown
          id={ingredientAndRecipeId}
          options={issues}
          groupedOptions={subIssues}
          optionSelected={optionSelected}
          onChange={(issueId) => changeHandler(ingredientAndRecipeId, issueId)}
        />}
      </div>
    )
  })

  return renderedIngredients
}

const IngredientIssuesPresentation = ({
  content: {
    title,
    body,
    button1Copy,
    button2Copy,
  },
  ingredients,
  buttonLeftUrl,
  issues,
  subIssues,
  changeHandler,
  continueHandler
}) => (
  <GetHelpLayout title={title} body={body}>
    {renderIngredientsIssues(ingredients, issues, subIssues, changeHandler)}
    <BottomBar>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        {button1Copy}
      </BottomButton>
      <Button
        className={css.button}
        color="primary"
        onClick={continueHandler}
      >
        {button2Copy}
      </Button>
    </BottomBar>
  </GetHelpLayout>
)

IngredientIssuesPresentation.propTypes = propTypes
IngredientIssuesPresentation.defaultProps = defaultProps

export {
  IngredientIssuesPresentation
}
