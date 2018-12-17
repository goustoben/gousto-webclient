import React from 'react'
import PropTypes from 'prop-types'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
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
  buttonRightUrl: PropTypes.string.isRequired,
  ingredientsAndIssues: PropTypes.objectOf(
    PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
      ingredientId: PropTypes.string.isRequired,
      issueId: PropTypes.string.isRequired,
      issueName: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
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
  buttonRightUrl,
  ingredientsAndIssues,
}) => (
  <GetHelpLayout title={title} body={body}>
    <p>{secondBody}</p>
    {renderIngredientReasonsForm(ingredientsAndIssues)}
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

const renderIngredientReasonsForm = (ingredientsAndIssues) => {
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
      <div key={recipeIngredientAndIssueIds} className={css.issueDeatils}>
        <p>{issueName} - {label}</p>
        <textarea id={recipeIngredientAndIssueIds} />
      </div>
    )
  })
}

IngredientReasonsPresentation.propTypes = propTypes

export {
  IngredientReasonsPresentation
}
