import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { validateIngredients } from 'apis/getHelp'
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
      ...this.state,
      selectedIngredients: newSelectedIngredients
    })
  }

  continueClickHandler = () => {
    // POST -> /validate-ingredients -> {customer_id: int, order_id: int, ingredients: array}
    // 200 -> {'valid': True}

    const { order, user } = this.props
    const { selectedIngredients } = this.state
    const ingredients = []

    selectedIngredients.forEach((value, ingredientId) => {
      ingredients.push(ingredientId)
    })

    validateIngredients(
      user.accessToken,
      {
        customer_id: Number(user.id),
        order_id: Number(order.id),
        ingredients
      }
    )

  }

  render() {
    const { content, recipes } = this.props
    const { selectedIngredients } = this.state
    const buttonLeftUrl = client.getHelp.index
    const cssButton = css.button

    return (
      <IngredientsPresentation
        content={content}
        buttonLeftUrl={buttonLeftUrl}
        cssButton={cssButton}
        cannotContinue={selectedIngredients.size < 1}
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
