import React from 'react'
import buttonCss from './FiveRecipesAddRecipeButton.module.css'
import { FiveRecipesEndOfJourneyModal } from './FiveRecipesEndOfJourneyModal'

export const FiveRecipesAddRecipeButton = ({ onDetailsPage }: { onDetailsPage?: boolean }) => {
  const [isOpen, updateIsOpen] = React.useState(false)

  const onModalClose = () => {
    updateIsOpen(false)
  }

  const onClick = (ev: React.MouseEvent | React.KeyboardEvent) => {
    ev.stopPropagation()
    updateIsOpen(true)
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
