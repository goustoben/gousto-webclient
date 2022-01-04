import React from 'react'
import PropTypes from 'prop-types'
import { Card, CTA } from 'goustouicomponents'
import Link from 'Link'
import routes from 'config/routes'
import { recipePropType } from '../getHelpPropTypes'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { RecipeLinksContainer } from './RecipeLinks'
import layoutCss from '../layouts/GetHelpLayout2/GetHelpLayout2.css'
import css from './RecipeCards.css'

const RecipeCards = ({
  params,
  recipes,
  trackClickChoosePrintedRecipeCards,
}) => {
  const { orderId, userId } = params

  return (
    <GetHelpLayout2 headingText="What recipe card was affected?">
      <p className={css.copyOutOfCard}>You will be taken to the recipe steps in the Cookbook</p>
      <Card
        hasLateralBordersOnSmallScreens={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >
        <RecipeLinksContainer orderId={params.orderId} recipes={recipes} userId={params.userId} />
      </Card>
      <Card
        hasLateralBordersOnSmallScreens={false}
        className={layoutCss.sideBordersWhenGetHelpLayoutHasMargins}
      >
        <h2 className={css.subHead}>
          Do you want printed recipe cards?
        </h2>
        <p>
          We can send printed recipe cards but please allow&nbsp;
          <strong>5-7 working days</strong>
          &nbsp;for the cards to arrive.
        </p>
        <Link to={routes.client.getHelp.recipeCardsSelect({ userId, orderId })}>
          <CTA
            onClick={trackClickChoosePrintedRecipeCards}
            size="small"
            variant="secondary"
            testingSelector="choosePrintedRecipeCards"
          >
            Choose printed recipe cards
          </CTA>
        </Link>
      </Card>
    </GetHelpLayout2>
  )
}

RecipeCards.propTypes = {
  params: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  trackClickChoosePrintedRecipeCards: PropTypes.func.isRequired,
}

export {
  RecipeCards
}
