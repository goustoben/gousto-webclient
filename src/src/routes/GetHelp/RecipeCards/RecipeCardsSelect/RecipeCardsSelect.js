import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { client } from 'config/routes'
import { BottomFixedContent, CTA } from 'goustouicomponents'
import { GetHelpLayout2 } from '../../layouts/GetHelpLayout2'
import { recipePropType } from '../../getHelpPropTypes'
import { RecipeCardsList } from './RecipeCardsList'
import { AddressSectionContainer } from './AddressSection'
import css from './RecipeCardsSelect.css'

const RecipeCardsSelect = ({
  checkRecipeCardsEligibility,
  params,
  recipes,
  selectedRecipeCards,
  setSelectedRecipeCards,
  trackContinueToRecipeCardsIssues,
  location
}) => {
  const { orderId, userId } = params

  useEffect(() => {
    const coreRecipeIds = recipes.map(recipe => recipe.id)
    if (coreRecipeIds.length) {
      checkRecipeCardsEligibility(userId, orderId, coreRecipeIds)
    }
    if (location?.query?.recipeId && recipes.find(({id}) => id === location.query.recipeId)) {
      setSelectedRecipeCards([location.query.recipeId])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onInputChange = (id, isChecked) => {
    let recipeIdsSelected
    if (isChecked) {
      recipeIdsSelected = [...selectedRecipeCards, id]
    } else {
      recipeIdsSelected = selectedRecipeCards.filter(recipeId => recipeId !== id )
    }
    setSelectedRecipeCards(recipeIdsSelected)
  }

  const onContinue = () => {
    trackContinueToRecipeCardsIssues()
    browserHistory.push(`${client.getHelp.recipeCards({ userId, orderId })}/issues`)
  }

  return (
    <GetHelpLayout2
      headingText="Choose printed recipe cards"
    >
      <p className={css.subTitle}>Printed recipe cards will arrive in 5-7 working days.</p>
      <RecipeCardsList recipes={recipes} recipeIds={selectedRecipeCards} onInputChange={onInputChange} />
      <AddressSectionContainer />
      <BottomFixedContent>
        <CTA
          testingSelector="continueRecipeCard"
          isFullWidth
          size="small"
          isDisabled={!selectedRecipeCards.length}
          onClick={onContinue}
        >
          Continue
        </CTA>
      </BottomFixedContent>
    </GetHelpLayout2>
  )
}

RecipeCardsSelect.propTypes = {
  checkRecipeCardsEligibility: PropTypes.func.isRequired,
  params: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  selectedRecipeCards: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedRecipeCards: PropTypes.func.isRequired,
  trackContinueToRecipeCardsIssues: PropTypes.func.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      recipeId: PropTypes.string
    })
  }).isRequired
}

export { RecipeCardsSelect }
