import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Button } from 'goustouicomponents'
import css from './CookingInstructions.css'

class CookingInstructions extends PureComponent {
  state = {
    showRecipeSteps: false
  }

  fetchRecipeSteps = () => {
    const { cookbookLoadRecipeStepsById, recipeId, recipeStepsById } = this.props

    if (!recipeStepsById) {
      cookbookLoadRecipeStepsById(recipeId)
    }

    this.setState({ showRecipeSteps: true })
  }

  render() {
    const { showRecipeSteps } = this.state

    return showRecipeSteps ? (
      <div className={css.cookingInstructions}>
        <div>Cooking Instructions
          <div>Instructions for 2 people <span className={css.highlightText}>(double for 4)</span></div>
        </div>
      </div>
    ) : (
      <Button
        width="full"
        onClick={() => { this.fetchRecipeSteps() }}
      >
        See Cooking Instructions
      </Button>
    )
  }
}

CookingInstructions.propTypes = {
  cookbookLoadRecipeStepsById: PropTypes.func,
  recipeId: PropTypes.string.isRequired,
  recipeStepsById: PropTypes.instanceOf(Immutable.List),
}

export { CookingInstructions }
