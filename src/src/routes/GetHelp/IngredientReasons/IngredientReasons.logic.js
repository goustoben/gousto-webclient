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
  storeIngredientIssueDescriptions: PropTypes.func.isRequired,
}

const TEXTAREA_VALID_LENGTH = 1

class IngredientReasons extends PureComponent {
  state = {
    issueReasons: {}
  }

  changeHandler = (id, issueDescription) => {
    const { issueReasons } = this.state
    const { ingredientsAndIssues } = this.props
    const ingredientAndIssue = ingredientsAndIssues[id]

    const newIssueReasons = {
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
  }

  render() {
    const { content, ingredientsAndIssues } = this.props
    const { issueReasons } = this.state
    const buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredientIssues}`

    return (
      <IngredientReasonsPresentation
        content={content}
        buttonLeftUrl={buttonLeftUrl}
        ingredientsAndIssues={ingredientsAndIssues}
        onChange={this.changeHandler}
        onSubmit={this.submitHandler}
        disabledButton={false}
      />
    )
  }
}

IngredientReasons.propTypes = propTypes

export {
  IngredientReasons
}
