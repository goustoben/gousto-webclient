import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

class IngredientIssues extends PureComponent {

  buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredients}`
  buttonRightUrl = `${client.getHelp.index}/${client.getHelp.refund}`

  fetchData() {
    const { fetchIngredientIssues } = this.props

    fetchIngredientIssues()
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { content, ingredients } = this.props

    return (
      <IngredientIssuesPresentation
        content={content}
        ingredients={ingredients}
        buttonLeftUrl={this.buttonLeftUrl}
        buttonRightUrl={this.buttonRightUrl}
      />
    )
  }
}

IngredientIssues.propTypes = propTypes

export {
  IngredientIssues
}
