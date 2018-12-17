import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { IngredientReasonsPresentation } from './IngredientReasons.presentation'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  ingredientsAndIssues: PropTypes.objectOf(
    PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
      ingredientId: PropTypes.string.isRequired,
      issueId: PropTypes.string.isRequired,
      issueName: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  storeIngredientIssueDescription: PropTypes.func.isRequired,
}

const TEXTAREA_VALID_LENGTH = 5

class IngredientReasons extends PureComponent {
  state = {
    textareaValue: ''
  }

  changeHandler = (recipeAndIngredientIds, textareaValue) => {
    const { storeIngredientIssueDescription } = this.props

    this.setState({
      ...this.state,
      textareaValue
    })

    if (textareaValue.length >= TEXTAREA_VALID_LENGTH) {
      storeIngredientIssueDescription(recipeAndIngredientIds, textareaValue)
    }
  }

  render() {
    const { content, ingredientsAndIssues } = this.props
    const { textareaValue } = this.state
    const buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredientIssues}`
    const buttonRightUrl = `${client.getHelp.index}/${client.getHelp.refund}`
    const disabledButton = textareaValue.length < TEXTAREA_VALID_LENGTH

    return (
      <IngredientReasonsPresentation
        content={content}
        buttonLeftUrl={buttonLeftUrl}
        buttonRightUrl={buttonRightUrl}
        ingredientsAndIssues={ingredientsAndIssues}
        onChange={this.changeHandler}
        textareaValue={textareaValue}
        disabledButton={disabledButton}
      />
    )
  }
}

IngredientReasons.propTypes = propTypes

export {
  IngredientReasons
}
