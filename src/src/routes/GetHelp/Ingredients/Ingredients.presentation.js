import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card } from 'goustouicomponents'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'
import { RecipeList } from '../components/RecipeList'
import { RecipeIngredientsContainer } from '../components/RecipeIngredients'
import { recipePropType } from '../getHelpPropTypes'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.module.css'
import css from './Ingredients.module.css'

const propTypes = {
  cannotContinue: PropTypes.bool.isRequired,
  changeHandler: PropTypes.func.isRequired,
  continueClick: PropTypes.func.isRequired,
  massIssueIneligibleIngredientUuids: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  selectedIngredients: PropTypes.instanceOf(Map).isRequired,
}

const IngredientsPresentation = ({
  cannotContinue,
  changeHandler,
  continueClick,
  massIssueIneligibleIngredientUuids,
  recipes,
  selectedIngredients,
}) => (
  <GetHelpLayout2 headingText="Get help with your box">
    <Card
      hasLateralBordersOnSmallScreens={false}
      className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
    >
      <p className={css.copy}>
        Which ingredient(s) had an issue? Select meal to see ingredients.
      </p>
      <RecipeList recipes={recipes}>
        <RecipeIngredientsContainer
          massIssueIneligibleIngredientUuids={massIssueIneligibleIngredientUuids}
          selectedIngredients={selectedIngredients}
          onChange={changeHandler}
        />
      </RecipeList>
      <BottomFixedContentWrapper>
        <Button
          className={css.button}
          color="primary"
          disabled={cannotContinue}
          onClick={(continueClick)}
        >
          Continue
        </Button>
      </BottomFixedContentWrapper>
    </Card>
  </GetHelpLayout2>
)

IngredientsPresentation.propTypes = propTypes

export {
  IngredientsPresentation
}
