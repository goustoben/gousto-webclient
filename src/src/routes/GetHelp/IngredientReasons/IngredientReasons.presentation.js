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
  isSubmitDisabled: PropTypes.bool.isRequired,
  ingredientReasons: PropTypes.objectOf(
    PropTypes.shape({
      issueName: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      issueDescription: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
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
  isSubmitDisabled,
  ingredientReasons,
  onChange,
  onSubmit,
}) => (
  <GetHelpLayout title={title} body={body}>
    <p>{secondBody}</p>
    {renderIngredientReasonsForm(ingredientReasons, onChange)}
    <BottomBar>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        {button1Copy}
      </BottomButton>
      <Button
        color="primary"
        disabled={isSubmitDisabled}
        onClick={onSubmit}
      >
        {button2Copy}
      </Button>
    </BottomBar>
  </GetHelpLayout>
)

const renderIngredientReasonsForm = (ingredientReasons, onChange) => {
  return Object.keys(ingredientReasons).map(key => {
    const {
      issueName,
      label
    } = ingredientReasons[key]

    return (
      <div key={key} className={css.issueDetails}>
        <p>{issueName} - {label}</p>
        <textarea
          id={key}
          value={ingredientReasons[key].issueDescription}
          onChange={
            (event) => onChange(key, event.target.value)
          }
        />
      </div>
    )
  })
}

IngredientReasonsPresentation.propTypes = propTypes

export {
  IngredientReasonsPresentation
}
