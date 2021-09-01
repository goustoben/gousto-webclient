import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { IngredientReasonsPresentation } from './IngredientReasons.presentation'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
  }).isRequired,
  ingredientsAndIssues: PropTypes.objectOf(
    PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
      ingredientUuid: PropTypes.string.isRequired,
      issueId: PropTypes.string.isRequired,
      issueName: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  storeIngredientIssueDescriptions: PropTypes.func.isRequired,
  trackIngredientReasonsConfirmed: PropTypes.func.isRequired,
}

class IngredientReasons extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      issueReasons: {}
    }
  }

  changeHandler = (id, issueDescription) => {
    const { issueReasons } = this.state
    const { ingredientsAndIssues } = this.props
    const ingredientAndIssue = ingredientsAndIssues[id]

    const newIssueReasons = {
      ...ingredientsAndIssues,
      ...issueReasons,
      [id]: {
        ...ingredientAndIssue,
        issueDescription,
      }
    }

    this.setState({
      issueReasons: { ...issueReasons, ...newIssueReasons },
    })
  }

  submitHandler = () => {
    const { storeIngredientIssueDescriptions, trackIngredientReasonsConfirmed } = this.props
    const { issueReasons } = this.state

    const ingredientsTrackingData = Object.entries(issueReasons)
      .map(([_key, selectedIngredient]) => ({
        recipe_id: selectedIngredient.recipeId,
        ingredient_name: selectedIngredient.label,
      }))

    storeIngredientIssueDescriptions(issueReasons)
    trackIngredientReasonsConfirmed(ingredientsTrackingData)

    browserHistory.push(`${client.getHelp.index}/${client.getHelp.autoAcceptCheck}`)
  }

  isSubmitDisabled = () => {
    const { issueReasons } = this.state
    const issueReasonsKeys = Object.keys(issueReasons)

    if (issueReasonsKeys.length === 0) {
      return true
    }

    const result = issueReasonsKeys.some(key => {
      const { issueDescription } = issueReasons[key]

      return !issueDescription || issueDescription.length === 0
    })

    return result
  }

  render() {
    const { content, ingredientsAndIssues } = this.props
    const { issueReasons } = this.state
    const ingredientsWithIssueReasons = Object.keys(issueReasons).length > 0
      ? issueReasons
      : ingredientsAndIssues

    return (
      <IngredientReasonsPresentation
        content={content}
        ingredientReasons={ingredientsWithIssueReasons}
        onChange={this.changeHandler}
        onSubmit={this.submitHandler}
        isSubmitDisabled={this.isSubmitDisabled()}
      />
    )
  }
}

IngredientReasons.propTypes = propTypes

export {
  IngredientReasons
}
