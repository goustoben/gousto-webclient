import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import { windowOpen } from 'utils/window'
import { client as routes } from 'config/routes'
import Link from 'components/Link'
import { Alert, BottomFixedContent, Card, CTA } from 'goustouicomponents'
import { recipePropType } from '../../getHelpPropTypes'
import { GetHelpLayout2 } from '../../layouts/GetHelpLayout2'
import css from './RecipeCardConfirmation.module.css'

const RecipeCardConfirmation = ({
  selectedAddress,
  recipeCardsDetails,
  trackPrintedRecipeCardClickRecipe,
  trackPrintedRecipeCardClickDone,
  trackPrintedRecipeCardClickCookbook,
}) => {
  const isMultipleRecipeCards = recipeCardsDetails.length > 1
  const headingText = `We’re so sorry about the issue with your recipe card${isMultipleRecipeCards ? 's' : ''}`

  const renderRecipeLinksToCookbook = () => recipeCardsDetails.map(({ id, title }) => (
    <Link
      key={id}
      className={css.recipeCookbookLink}
      to={`${routes.cookbookRecipeById}/${id}`}
      tracking={trackPrintedRecipeCardClickRecipe}
    >
      {title}
    </Link>
  ))

  return (
    <GetHelpLayout2 headingText={headingText} hasBackButton={false}>
      <Card>
        <Alert type="success" hasIcon={false}>
          <div className={css.alertContent}>
            <div className={css.alertIconWrapper}>
              <Svg label="cookbook" fileName="icon-cookbook" className={css.alertIcon} />
            </div>
            <div>
              <p className={css.confirmationCopy}>
                Recipe card
                {isMultipleRecipeCards ? 's' : ''}
                {' '}
                confirmed
                <span className={css.deliveryTimeCopy}>
                  Delivered in
                  {' '}
                  <strong>
                    5-7 working days
                  </strong>
                </span>
              </p>
            </div>
          </div>
        </Alert>
        <p className={css.confirmationAddress}>
          We are pleased to confirm that your printed recipe card
          {isMultipleRecipeCards ? 's' : ''}
          {' '}
          will arrive in
          {' '}
          <strong>
            5-7 working days
          </strong>
          {selectedAddress && (
            <>
              , at
              <strong>
                {' '}
                {selectedAddress.name}
                {', '}
                {selectedAddress.line1}
                {', '}
                {selectedAddress.line2}
                {', '}
                {selectedAddress.town}
                {', '}
                {selectedAddress.postcode}
              </strong>
            </>
          )}
        </p>
        <p>
          In the meantime, you can view the missing recipe card below or all your recipes on the Gousto Cookbook.
        </p>
        {renderRecipeLinksToCookbook()}
      </Card>
      <BottomFixedContent>
        <div className={css.doneButton}>
          <CTA
            testingSelector="doneCTA"
            isFullWidth
            size="small"
            onClick={() => {
              trackPrintedRecipeCardClickDone()
              window.location.assign(routes.myGousto)
            }}
          >
            Done
          </CTA>
        </div>
        <CTA
          testingSelector="goToCookbookCTA"
          isFullWidth
          size="small"
          variant="secondary"
          onClick={() => {
            trackPrintedRecipeCardClickCookbook()
            windowOpen(routes.cookbook)
          }}
        >
          View Cookbook
        </CTA>
      </BottomFixedContent>
    </GetHelpLayout2>
  )
}

RecipeCardConfirmation.propTypes = {
  recipeCardsDetails: PropTypes.arrayOf(recipePropType).isRequired,
  selectedAddress: PropTypes.shape({
    name: PropTypes.string,
    line1: PropTypes.string,
    line2: PropTypes.string,
    town: PropTypes.string,
    postcode: PropTypes.string,
  }).isRequired,
  trackPrintedRecipeCardClickRecipe: PropTypes.func.isRequired,
  trackPrintedRecipeCardClickDone: PropTypes.func.isRequired,
  trackPrintedRecipeCardClickCookbook: PropTypes.func.isRequired,
}

export { RecipeCardConfirmation }
