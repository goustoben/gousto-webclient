import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'
import Immutable from 'immutable'
import Image from 'Recipe/Image'
import { Button } from 'goustouicomponents'
import css from './CookingInstructions.css'

class CookingInstructions extends PureComponent {

  fetchRecipeSteps = () => {
    const { cookbookLoadRecipeStepsById, recipeId, recipeStepsById } = this.props

    if (!recipeStepsById.size) {
      cookbookLoadRecipeStepsById(recipeId)
    }
  }

  cookingSteps = (recipeStepsById, view) => {
    return (
      <div className={css.container}>
        {recipeStepsById.map(recipeStep => (
          this.cookingStep(recipeStep, view)
        ))}
      </div>
    )
  }

  cookingStep = ( recipeStep, view ) => {
    const images = recipeStep.get('media').get('images')
    const instruction = recipeStep.get('instruction')
    const instructionSanitize = DOMPurify.sanitize(instruction).replace(/&nbsp;/g, ' ')
    const stepNumber = recipeStep.get('stepNumber')
    let title 
    let urls

    const section = view === "detail" ? css.sectionDetail : css.sectionFineDineIn

    if (images.size > 0) {
      urls = images.first().get('urls')
      title = images.first().get('title')
    }

    const showImage = !!urls && stepNumber !== 8
    const showNumber = !!images.size

    return (
      <div key={stepNumber} className={section}>
        <div className={css.recipeImage}>
          {showImage && <div className={css.stepImage}><Image media={urls} title={title} view="detail" /></div>}
          {showNumber && <span className={css.stepNumber}>{stepNumber}</span>}
        </div>
        <div className={css.recipeInstruction}>
          <div className={css.stepInstruction} dangerouslySetInnerHTML={{__html: instructionSanitize }} />
        </div>
      </div>
    )
  }

  render() {
    const { recipeStepsById, view } = this.props

    if (recipeStepsById.size) {
      return (
        <div>
          <div className={css.insetHeading}>
            <span className={css.heading}>Cooking Instructions</span>
            <div>Instructions for 2 people <span className={css.highlightText}>(double for 4)</span></div>
          </div>
          { this.cookingSteps(recipeStepsById, view) }
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
  view: PropTypes.string,
}

CookingInstructions.defaultProps = {
  recipeStepsById: Immutable.List(),
}

export { CookingInstructions }
