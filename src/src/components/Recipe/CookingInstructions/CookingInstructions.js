import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Button } from 'goustouicomponents'
import { CookingInstructionsDesktop } from './CookingInstructionsDesktop/CookingInstructionsDesktop'
import css from './CookingInstructions.css'

class CookingInstructions extends PureComponent {

  fetchRecipeSteps = () => {
    const { cookbookLoadRecipeStepsById, recipeId, recipeStepsById } = this.props

    if (!recipeStepsById.size) {
      cookbookLoadRecipeStepsById(recipeId)
    }
  }

  render() {
    const { isDesktop, recipeStepsById } = this.props

    return recipeStepsById.size ? (
      <div>
        <div className={css.insetHeading}>
          <span className={css.heading}>Cooking Instructions</span>
          <div>Instructions for 2 people <span className={css.highlightText}>(double for 4)</span></div>
        </div>
        {isDesktop ? (<CookingInstructionsDesktop steps={recipeStepsById} />)
          : (<div>Mobile</div>)}
      </div>
    ) : (
      <Button
        width="full"
        color="secondary"
        onClick={() => this.fetchRecipeSteps()}
      >
        See Cooking Instructions
      </Button>
    )
  }
}

CookingInstructions.propTypes = {
  cookbookLoadRecipeStepsById: PropTypes.func,
  isDesktop: PropTypes.bool,
  recipeId: PropTypes.string.isRequired,
  recipeStepsById: PropTypes.instanceOf(Immutable.List),
}

CookingInstructions.defaultProps = {
  recipeStepsById: Immutable.List(),
}

export { CookingInstructions }
