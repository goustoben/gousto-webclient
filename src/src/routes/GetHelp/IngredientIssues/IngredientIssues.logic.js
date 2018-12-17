import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { IngredientIssuesPresentation } from './IngredientIssues.presentation'

import css from './IngredientIssues.css'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  fetchIngredientIssues: PropTypes.func.isRequired,
  ingredients: PropTypes.objectOf(
    PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
      ingredientId: PropTypes.string.isRequired,
      issueId: PropTypes.string,
      issueName: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      requireDescription: PropTypes.bool.isRequired,
    }).isRequired
  ),
  storeSelectedIngredientIssue: PropTypes.func.isRequired,
  subIssues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      groupLabel: PropTypes.string.isRequired,
      requireDescription: PropTypes.bool.isRequired,
    }).isRequired
  )
}

class IngredientIssues extends PureComponent {

  buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredients}`
  buttonRightUrl = `${client.getHelp.index}/${client.getHelp.ingredientReasons}`

  fetchData() {
    const { fetchIngredientIssues } = this.props

    fetchIngredientIssues()
  }

  componentDidMount() {
    this.fetchData()
  }

  changeHandler = (ingredientAndRecipeId, issueId) => {
    const { issues, subIssues, storeSelectedIngredientIssue } = this.props
    const selectedIssue = issues.find(issue => issue.id === issueId)
    const selectedSubIssue = subIssues.find(subIssue => subIssue.id === issueId)
    const issueLabel = selectedIssue ? selectedIssue.label : selectedSubIssue.label

    storeSelectedIngredientIssue(ingredientAndRecipeId, issueId, issueLabel)
  }

  render() {
    const { content, ingredients, issues, subIssues } = this.props
    const cssLabel = css.ingredientLabel

    return (
      <IngredientIssuesPresentation
        content={content}
        ingredients={ingredients}
        buttonLeftUrl={this.buttonLeftUrl}
        buttonRightUrl={this.buttonRightUrl}
        issues={issues}
        subIssues={subIssues}
        cssLabel={cssLabel}
        changeHandler={this.changeHandler}
      />
    )
  }
}

IngredientIssues.propTypes = propTypes

export {
  IngredientIssues
}
