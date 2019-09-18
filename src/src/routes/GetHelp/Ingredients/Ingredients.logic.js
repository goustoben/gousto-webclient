import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { IngredientsPresentation } from './Ingredients.presentation'
import { RecipeList } from '../components/RecipeList'

import css from './Ingredients.css'

const propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      )
    })
  ),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }),
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  storeSelectedIngredients: PropTypes.func.isRequired,
  validateSelectedIngredients: PropTypes.func.isRequired,
}

class Ingredients extends PureComponent {
  state = {
    selectedIngredients: new Map()
  }

  changeHandler = (checkboxId, isChecked) => {
    const { selectedIngredients } = this.state
    const newSelectedIngredients = new Map(selectedIngredients)

    if (isChecked) {
      newSelectedIngredients.set(checkboxId, isChecked)
    } else {
      newSelectedIngredients.delete(checkboxId)
    }

    this.setState({
      selectedIngredients: newSelectedIngredients
    })
  }

  continueClickHandler = async () => {
    const {
      order,
      user,
      storeSelectedIngredients,
      validateSelectedIngredients
    } = this.props
    const { selectedIngredients } = this.state
    const ingredientIds = []
    const recipeAndIngredientIds = []

    selectedIngredients.forEach((value, checkboxId) => {
      const [recipeId, ingredientId] = checkboxId.split('-')
      ingredientIds.push(ingredientId)
      recipeAndIngredientIds.push({ recipeId, ingredientId })
    })

    try {
      await validateSelectedIngredients({
        accessToken: user.accessToken,
        costumerId: user.id,
        orderId: order.id,
        ingredientIds,
      })

      storeSelectedIngredients(recipeAndIngredientIds)

      browserHistory.push(`${client.getHelp.index}/${client.getHelp.ingredientIssues}`)
    } catch (error) {
      browserHistory.push(`${client.getHelp.index}/${client.getHelp.contact}`)
    }
  }

  render() {
    const { content, recipes } = this.props
    const { selectedIngredients } = this.state
    const hasSelectAnyIngredient = selectedIngredients.size > 0
    const buttonLeftUrl = client.getHelp.index
    const cssButton = css.button

    return (
      <IngredientsPresentation
        content={content}
        buttonLeftUrl={buttonLeftUrl}
        cssButton={cssButton}
        cannotContinue={!hasSelectAnyIngredient}
        continueClick={this.continueClickHandler}
      >
        <RecipeList
          recipes={recipes}
          selectedIngredients={selectedIngredients}
          onChange={this.changeHandler}
        />
      </IngredientsPresentation>
    )
  }
}

Ingredients.propTypes = propTypes

export {
  Ingredients
}
