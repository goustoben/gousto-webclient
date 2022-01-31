import React from 'react'
import { experimentFiveRecipesAddRecipe } from 'actions/trackingKeys'
import buttonCss from './FiveRecipesAddRecipeButton.module.css'
import { FiveRecipesEndOfJourneyModal } from './FiveRecipesEndOfJourneyModal'
import { useFiveRecipesTracking } from './useFiveRecipesTracking'

type Props = {
  recipeId: string
  onDetailsPage?: boolean
}

export const FiveRecipesAddRecipeButton = ({ onDetailsPage, recipeId }: Props) => {
  const [isOpen, updateIsOpen] = React.useState(false)
  const onModalClose = () => {
    updateIsOpen(false)
  }
  const trackFiveRecipes = useFiveRecipesTracking()

  const onClick = (ev: React.MouseEvent | React.KeyboardEvent) => {
    ev.stopPropagation()
    updateIsOpen(true)
    trackFiveRecipes(experimentFiveRecipesAddRecipe, { recipe_id: recipeId })
  }

  return (
    <>
      <button
        className={buttonCss.addButton}
        name="addRecipeButton"
        type="button"
        onClick={onClick}
        aria-label="Add recipe"
      >
        <span className={buttonCss.buttonText}>
          {!onDetailsPage && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line className={buttonCss.addButtonLine} y1="7" x2="14" y2="7" strokeWidth="2" />
              <line x1="7" y1="14" x2="7" stroke="white" strokeWidth="2" />
            </svg>
          )}
          <span className={onDetailsPage ? '' : buttonCss.hideOnMobile}>Add recipe</span>
        </span>
      </button>

      <FiveRecipesEndOfJourneyModal isOpen={isOpen} onClose={onModalClose} />
    </>
  )
}
