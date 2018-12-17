import React from 'react'
import PropTypes from 'prop-types'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { Dropdown } from 'goustouicomponents'
import { BottomButton } from '../components/BottomButton'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  changeHandler: PropTypes.func.isRequired,
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
  buttonRightUrl: PropTypes.string,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      requireDescription: PropTypes.bool.isRequired,
    }).isRequired
  ),
  cssLabel: PropTypes.string.isRequired,
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

const renderIngredientsIssues = (ingredients, issues, subIssues, cssLabel, changeHandler) => {

  const renderedIngredients = Object.keys(ingredients).map((ingredientAndRecipeId) => {
    const optionSelected = issues && issues[0] && issues[0].id
    const ingredientLabel = ingredients[ingredientAndRecipeId].label

    return (
      <div key={ingredientAndRecipeId}>
        <p className={cssLabel}>{ingredientLabel}</p>
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
  buttonRightUrl,
  issues,
  subIssues,
  cssLabel,
  changeHandler,
}) => (
  <GetHelpLayout title={title} body={body}>
    {renderIngredientsIssues(ingredients, issues, subIssues, cssLabel, changeHandler)}
    <BottomBar>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        {button1Copy}
      </BottomButton>
      <BottomButton color="primary" url={buttonRightUrl} clientRouted>
        {button2Copy}
      </BottomButton>
    </BottomBar>
  </GetHelpLayout>
)

IngredientIssuesPresentation.propTypes = propTypes
IngredientIssuesPresentation.defaultProps = defaultProps

export {
  IngredientIssuesPresentation
}
