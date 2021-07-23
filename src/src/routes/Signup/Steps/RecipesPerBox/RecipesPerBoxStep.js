import PropTypes from 'prop-types'
import React from 'react'
import { signupConfig } from 'config/signup'
import { Heading } from 'goustouicomponents'
import { completeWizardRecipesPerBox } from 'actions/trackingKeys'
import { Button } from '../../Button'
import signupCss from '../../Signup.css'
import { Image } from '../../Image'
import css from './RecipesPerBoxStep.css'

const RecipesPerBoxStep = ({ basketSetNumRecipes, trackSignupWizardAction, next }) => {
  const handleClick = (value) => {
    basketSetNumRecipes(value)
    trackSignupWizardAction(completeWizardRecipesPerBox, {
      recipes_per_box: value,
    })
    next()
  }

  const renderButtons = () => (
    <React.Fragment>
      {signupConfig.recipesPerBoxStep.recipesPerBoxPossibleValues.map((value) => (
        <div className={css.buttonContainer} key={`recipesPerBox_${value}`}>
          <Button
            fill={false}
            onClick={() => {
              handleClick(value)
            }}
            width="full"
          >
            {`${value}`}
          </Button>
        </div>
      ))}
    </React.Fragment>
  )

  return (
    <div className={signupCss.stepContainer} data-testing="signupRecipesPerBoxStep">
      <div className={signupCss.fullWidth}>
        <div className={signupCss.header}>
          <Heading type="h1">{signupConfig.recipesPerBoxStep.title}</Heading>
          <Image name="recipes-per-box" />
        </div>
        <div className={signupCss.body}>
          <div className={css.container}>{renderButtons()}</div>
        </div>
      </div>
    </div>
  )
}

RecipesPerBoxStep.propTypes = {
  next: PropTypes.func.isRequired,
  basketSetNumRecipes: PropTypes.func.isRequired,
  trackSignupWizardAction: PropTypes.func.isRequired,
}

export { RecipesPerBoxStep }
