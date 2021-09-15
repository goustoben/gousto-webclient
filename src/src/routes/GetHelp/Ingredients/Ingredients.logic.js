import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { LoadingWrapper } from '../LoadingWrapper'
import { IngredientsPresentation } from './Ingredients.presentation'
import { recipePropType } from '../getHelpPropTypes'

const propTypes = {
  massIssueIneligibleIngredientUuids: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOrderValidationError: PropTypes.bool.isRequired,
  isValidateOrderLoading: PropTypes.bool.isRequired,
  order: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  recipes: PropTypes.arrayOf(recipePropType),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }),
  storeSelectedIngredients: PropTypes.func.isRequired,
  trackDeselectIngredient: PropTypes.func.isRequired,
  trackSelectIngredient: PropTypes.func.isRequired,
  validateLatestOrder: PropTypes.func.isRequired,
  validateSelectedIngredients: PropTypes.func.isRequired,
}

const defaultProps = {
  order: {},
  recipes: [],
  user: {},
}

class Ingredients extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedIngredients: new Map(),
    }
  }

  componentDidMount() {
    const { validateLatestOrder, user, order } = this.props

    validateLatestOrder({
      accessToken: user.accessToken,
      costumerId: user.id,
      orderId: order.id,
    })
  }

  componentDidUpdate() {
    const { isOrderValidationError } = this.props

    if (isOrderValidationError) {
      this.redirectToContactPage()
    }
  }

  changeHandler = (checkboxId, isChecked, ingredientName) => {
    const { selectedIngredients } = this.state
    const { trackDeselectIngredient, trackSelectIngredient } = this.props
    const newSelectedIngredients = new Map(selectedIngredients)

    if (isChecked) {
      newSelectedIngredients.set(checkboxId, isChecked)
      trackSelectIngredient(ingredientName)
    } else {
      newSelectedIngredients.delete(checkboxId)
      trackDeselectIngredient(ingredientName)
    }

    this.setState({
      selectedIngredients: newSelectedIngredients
    })
  }

  getIngredientName = (recipeId, ingredientUuid) => {
    const { recipes } = this.props
    const ERROR_NOT_FOUND = 'error, ingredient not found, this should not happen'
    const { label = ERROR_NOT_FOUND } = recipes.find(recipe => recipe.id === recipeId)
      .ingredients.find(ingredient => ingredient.uuid === ingredientUuid)

    return label
  }

  continueClickHandler = async () => {
    const {
      order,
      user,
      storeSelectedIngredients,
      validateSelectedIngredients
    } = this.props
    const { selectedIngredients } = this.state
    const ingredientUuids = []
    const selectedIngredientsInfo = []

    selectedIngredients.forEach((value, checkboxId) => {
      const [recipeId, ingredientUuid] = checkboxId.split('&')
      const label = this.getIngredientName(recipeId, ingredientUuid)
      ingredientUuids.push(ingredientUuid)
      selectedIngredientsInfo.push({ recipeId, ingredientUuid, label })
    })

    try {
      await validateSelectedIngredients({
        accessToken: user.accessToken,
        costumerId: user.id,
        orderId: order.id,
        ingredientUuids,
      })

      storeSelectedIngredients(selectedIngredientsInfo)

      browserHistory.push(`${client.getHelp.index}/${client.getHelp.ingredientIssues}`)
    } catch (error) {
      this.redirectToContactPage()
    }
  }

  redirectToContactPage = () => {
    browserHistory.push(`${client.getHelp.index}/${client.getHelp.contact}`)
  }

  render() {
    const { recipes, massIssueIneligibleIngredientUuids, isValidateOrderLoading } = this.props
    const { selectedIngredients } = this.state
    const hasSelectAnyIngredient = selectedIngredients.size > 0
    const buttonLeftUrl = client.getHelp.index

    return (
      (isValidateOrderLoading) ? (
        <LoadingWrapper />
      ) : (
        <IngredientsPresentation
          buttonLeftUrl={buttonLeftUrl}
          changeHandler={this.changeHandler}
          cannotContinue={!hasSelectAnyIngredient}
          continueClick={this.continueClickHandler}
          massIssueIneligibleIngredientUuids={massIssueIneligibleIngredientUuids}
          recipes={recipes}
          selectedIngredients={selectedIngredients}
        />
      )
    )
  }
}

Ingredients.propTypes = propTypes
Ingredients.defaultProps = defaultProps

export {
  Ingredients
}
