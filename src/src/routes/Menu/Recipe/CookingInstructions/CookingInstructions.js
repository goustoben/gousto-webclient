import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Image from 'routes/Menu/Recipe/Image'
import { sanitize } from 'utils/sanitizer'
import { Button } from 'goustouicomponents'
import css from './CookingInstructions.css'

class CookingInstructions extends PureComponent {
  fetchRecipeSteps = () => {
    const { cookbookLoadRecipeStepsById, recipeId, recipeStepsById } = this.props

    if (!recipeStepsById.size) {
      cookbookLoadRecipeStepsById(recipeId)
    }
  }

  cookingSteps = (recipeStepsById) => {
    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          {recipeStepsById.map(recipeStep => (
            this.cookingStep(recipeStep)
          ))}
        </div>
      </div>
    )
  }

  cookingStep = (recipeStep) => {
    const images = recipeStep.get('media').get('images')
    const instruction = recipeStep.get('instruction')
    const instructionSanitize = sanitize(instruction).replace(/&nbsp;/g, ' ')
    const stepNumber = recipeStep.get('stepNumber')
    let title
    let urls

    if (images.size > 0) {
      urls = images.first().get('urls')
      title = images.first().get('title')
    }

    const showImage = !!urls && stepNumber !== 8
    const showNumber = !!images.size

    return (
      <div key={stepNumber} className={css.section}>
        <div className={css.recipeImage}>
          {showImage && <div className={css.stepImage}><Image media={urls} title={title} view="detail" /></div>}
          {showNumber && <span className={css.stepNumber}>{stepNumber}</span>}
        </div>
        <div className={css.recipeInstruction}>
          <div className={css.stepInstruction} dangerouslySetInnerHTML={{ __html: instructionSanitize }} />
        </div>
      </div>
    )
  }

  render() {
    const { recipeStepsById } = this.props

    if (recipeStepsById.size) {
      return (
        <div>
          <div className={css.insetHeading}>
            <span className={css.heading}>Cooking Instructions</span>
            <div>
              Instructions for 2 people
              <span className={css.highlightText}>(double for 4)</span>
            </div>
          </div>
          {this.cookingSteps(recipeStepsById)}
        </div>
      )
    }

    return (
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
  recipeId: PropTypes.string.isRequired,
  recipeStepsById: PropTypes.instanceOf(Immutable.List),
}

CookingInstructions.defaultProps = {
  recipeStepsById: Immutable.List(),
}

export { CookingInstructions }
