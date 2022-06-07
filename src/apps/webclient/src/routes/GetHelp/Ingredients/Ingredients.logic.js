import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { LoadingWrapper } from '../LoadingWrapper'
import { IngredientsPresentation } from './Ingredients.presentation'
import { orderPropType, recipePropType } from '../getHelpPropTypes'

const propTypes = {
  massIssueIneligibleIngrsByRecipeGRMap: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  isMultiComplaintLimitReachedLastFourWeeks: PropTypes.bool.isRequired,
  hasRepetitiveIssues: PropTypes.bool,
  isBoxDailyComplaintLimitReached: PropTypes.bool.isRequired,
  isOrderValidationError: PropTypes.bool.isRequired,
  isValidateOrderLoading: PropTypes.bool.isRequired,
  order: orderPropType,
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
  hasRepetitiveIssues: false,
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
      customerId: user.id,
      orderId: order.id,
    })
  }

  componentDidUpdate() {
    const {
      isOrderValidationError,
      isMultiComplaintLimitReachedLastFourWeeks,
      isBoxDailyComplaintLimitReached,
      hasRepetitiveIssues,
    } = this.props
    if (isMultiComplaintLimitReachedLastFourWeeks) {
      this.redirectToIneligibleIngredientsPage()
    } else if (hasRepetitiveIssues) {
      this.repetitiveIngredientsIssues()
    } else if (isBoxDailyComplaintLimitReached) {
      this.redirectToSameDayIngredientIssues()
    } else if (isOrderValidationError) {
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
    const { recipeDetailedItems } = order
    const ingredients = []
    const selectedIngredientsInfo = []

    selectedIngredients.forEach((value, checkboxId) => {
      const [recipeId, ingredientUuid] = checkboxId.split('&')
      const recipeGoustoReference = recipeDetailedItems[recipeId]
      const label = this.getIngredientName(recipeId, ingredientUuid)
      ingredients.push({ ingredient_uuid: ingredientUuid, recipe_gousto_reference: recipeGoustoReference })
      selectedIngredientsInfo.push({ recipeId, ingredientUuid, label, recipeGoustoReference })
    })

    try {
      await validateSelectedIngredients({
        accessToken: user.accessToken,
        customerId: user.id,
        orderId: order.id,
        ingredients
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

  redirectToIneligibleIngredientsPage = () => {
    browserHistory.push(`${client.getHelp.index}/${client.getHelp.multipleIngredientsIssues}`)
  }

  redirectToSameDayIngredientIssues = () => {
    browserHistory.push(`${client.getHelp.index}/${client.getHelp.sameDayIngredientIssues}`)
  }

  repetitiveIngredientsIssues = () => {
    const { user, order } = this.props
    browserHistory.push(`${client.getHelp.repetitiveIngredientsIssues({ userId: user.id, orderId: order.id })}`)
  }

  render() {
    const { recipes, massIssueIneligibleIngrsByRecipeGRMap, isValidateOrderLoading } = this.props
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
          massIssueIneligibleIngrsByRecipeGRMap={massIssueIneligibleIngrsByRecipeGRMap}
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
