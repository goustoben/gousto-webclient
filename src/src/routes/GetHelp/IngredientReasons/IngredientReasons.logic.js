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
  storeIngredientIssueDescriptions: PropTypes.func.isRequired,
}

class IngredientReasons extends PureComponent {
  state = {
    issueReasons: {}
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
      ...this.state,
      issueReasons: { ...issueReasons, ...newIssueReasons },
    })
  }

  submitHandler = () => {
    const { storeIngredientIssueDescriptions } = this.props
    const { issueReasons } = this.state

    storeIngredientIssueDescriptions(issueReasons)
    browserHistory.push(`${client.getHelp.index}/${client.getHelp.refund}`)
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
    const buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredientIssues}`
    const ingredientsWithIssueReasons = Object.keys(issueReasons).length > 0
      ? issueReasons
      : ingredientsAndIssues

    return (
      <IngredientReasonsPresentation
        content={content}
        buttonLeftUrl={buttonLeftUrl}
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
