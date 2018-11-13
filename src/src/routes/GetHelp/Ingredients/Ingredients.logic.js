import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
  validateSelectedIngredients: PropTypes.func.isRequired
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

  continueClickHandler = async () => {
    const { order, user, validateSelectedIngredients } = this.props
    const { selectedIngredients } = this.state
    const ingredients = []

    selectedIngredients.forEach((value, ingredientId) => {
      ingredients.push(ingredientId)
    })

    try {
      await validateSelectedIngredients({
        accessToken: user.accessToken,
        costumerId: Number(user.id),
        orderId: Number(order.id),
        ingredients
      })
    } catch (error) {
      /* eslint-disable no-console */
      console.log('response', error)
    }
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
