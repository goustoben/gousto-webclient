import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { IngredientIssuesPresentation } from './IngredientIssues.presentation'

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
      id: PropTypes.string,
      label: PropTypes.string,
      requireDescription: PropTypes.bool,
    })
  ).isRequired,
  selectedIngredients: PropTypes.objectOf(PropTypes.shape({
    ingredientId: PropTypes.string,
    issueName: PropTypes.string,
    recipeId: PropTypes.string,
  })),
  storeSelectedIngredientIssue: PropTypes.func.isRequired,
  subIssues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      groupLabel: PropTypes.string,
      requireDescription: PropTypes.bool,
    })
  ).isRequired,
  trackIngredientIssues: PropTypes.func.isRequired,
}
const defaultProps = {
  selectedIngredients: {}
}

class IngredientIssues extends PureComponent {
  buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredients}`

  componentDidMount() {
    this.fetchData()
  }

  continueHandler = () => {
    const { selectedIngredients, trackIngredientIssues } = this.props
    const ingredientAndRecipeIdsWithIssueName = Object.keys(selectedIngredients)
      .map(key => ({
        recipeId: selectedIngredients[key].recipeId,
        ingredientId: selectedIngredients[key].ingredientId,
        issueName: selectedIngredients[key].issueName
      }))

    trackIngredientIssues(ingredientAndRecipeIdsWithIssueName)
    browserHistory.push(`${client.getHelp.index}/${client.getHelp.ingredientReasons}`)
  }

  changeHandler = (ingredientAndRecipeId, issueId) => {
    const { issues, subIssues, storeSelectedIngredientIssue } = this.props
    const selectedIssue = issues.find(issue => issue.id === issueId)
    const selectedSubIssue = subIssues.find(subIssue => subIssue.id === issueId)
    const issueLabel = selectedIssue ? selectedIssue.label : selectedSubIssue.label

    storeSelectedIngredientIssue(ingredientAndRecipeId, issueId, issueLabel)
  }

  fetchData() {
    const { fetchIngredientIssues } = this.props

    fetchIngredientIssues()
  }

  render() {
    const { content, ingredients, issues, subIssues } = this.props

    return (
      <IngredientIssuesPresentation
        content={content}
        ingredients={ingredients}
        buttonLeftUrl={this.buttonLeftUrl}
        issues={issues}
        subIssues={subIssues}
        continueHandler={this.continueHandler}
        changeHandler={this.changeHandler}
      />
    )
  }
}

IngredientIssues.defaultProps = defaultProps
IngredientIssues.propTypes = propTypes

export {
  IngredientIssues
}
