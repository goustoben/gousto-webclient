import React from 'react'
import PropTypes from 'prop-types'
import { GetHelpLayout } from 'layouts/GetHelpLayout'
import { Button } from 'goustouicomponents'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'
import css from './IngredientReasons.css'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    secondBody: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
  }).isRequired,
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

const renderIngredientReasonsForm = (ingredientReasons, onChange) => (
  Object.keys(ingredientReasons).map(key => {
    const {
      issueName,
      label
    } = ingredientReasons[key]

    return (
      <div key={key} className={css.issueDetails}>
        <p>
          {issueName}
          {' '}
          -
          {' '}
          {label}
        </p>
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
)

const IngredientReasonsPresentation = ({
  content: {
    title,
    body,
    secondBody,
    button1Copy,
  },
  isSubmitDisabled,
  ingredientReasons,
  onChange,
  onSubmit,
}) => (
  <GetHelpLayout title={title} body={body}>
    <p>{secondBody}</p>
    {renderIngredientReasonsForm(ingredientReasons, onChange)}
    <BottomFixedContentWrapper>
      <Button
        className={css.button}
        color="primary"
        disabled={isSubmitDisabled}
        onClick={onSubmit}
      >
        {button1Copy}
      </Button>
    </BottomFixedContentWrapper>
  </GetHelpLayout>
)

IngredientReasonsPresentation.propTypes = propTypes

export {
  IngredientReasonsPresentation
}
