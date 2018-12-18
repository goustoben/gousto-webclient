import React from 'react'
import PropTypes from 'prop-types'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { Button } from 'goustouicomponents'
import { BottomButton } from '../components/BottomButton'
import css from './IngredientReasons.css'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    secondBody: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  buttonLeftUrl: PropTypes.string.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  ingredientsAndIssues: PropTypes.objectOf(
    PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
      ingredientId: PropTypes.string.isRequired,
      issueId: PropTypes.string.isRequired,
      issueName: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  textareaValue: PropTypes.string.isRequired,
}

const IngredientReasonsPresentation = ({
  content: {
    title,
    body,
    secondBody,
    button1Copy,
    button2Copy,
  },
  buttonLeftUrl,
  disabledButton,
  ingredientsAndIssues,
  onChange,
  onSubmit,
  textareaValue,
}) => (
  <GetHelpLayout title={title} body={body}>
    <p>{secondBody}</p>
    {renderIngredientReasonsForm(ingredientsAndIssues, textareaValue, onChange)}
    <BottomBar>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        {button1Copy}
      </BottomButton>
      <Button
        color="primary"
        disabled={disabledButton}
        onClick={onSubmit}
      >
        {button2Copy}
      </Button>
    </BottomBar>
  </GetHelpLayout>
)

const renderIngredientReasonsForm = (ingredientsAndIssues, textareaValue, onChange) => {
  return Object.keys(ingredientsAndIssues).map(key => {
    const {
      recipeId,
      ingredientId,
      issueId,
      issueName,
      label
    } = ingredientsAndIssues[key]
    const recipeIngredientAndIssueIds = `${recipeId}-${ingredientId}-${issueId}`

    return (
      <div key={recipeIngredientAndIssueIds} className={css.issueDetails}>
        <p>{issueName} - {label}</p>
        <textarea
          id={recipeIngredientAndIssueIds}
          value={textareaValue}
          onChange={
            (event) => onChange(`${recipeId}-${ingredientId}`, event.target.value)}
        />
      </div>
    )
  })
}

IngredientReasonsPresentation.propTypes = propTypes

export {
  IngredientReasonsPresentation
}
