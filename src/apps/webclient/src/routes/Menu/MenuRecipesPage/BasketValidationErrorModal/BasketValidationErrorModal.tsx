import React, { useCallback } from 'react'

import { Button } from 'goustouicomponents'

import ModalComponent, { ModalTitle, ModalContent, ModalFooter } from 'components/ModalComponent'
import { useBasket } from 'routes/Menu/domains/basket'

import css from './BasketValidationErrorModal.css'

type BasketRule = {
  description: string
  recipes: {
    title: string
    imageUrl: string
  }[]
}

export const BasketValidationErrorModal = ({
  title,
  shouldShow,
  shouldShowSwapButton,
  closeModal,
  brokenRulesToDisplay = [],
  recipeToAdd,
  recipeToRemove,
  clearBasketNotValidError,
}: {
  title: string
  shouldShow: boolean
  shouldShowSwapButton: boolean
  closeModal: () => void
  brokenRulesToDisplay?: BasketRule[]
  recipeToAdd: string
  recipeToRemove: string
  clearBasketNotValidError: () => void
}) => {
  const { swapRecipes } = useBasket()
  const onSwapClick = useCallback(() => {
    if (recipeToAdd === null || recipeToRemove === null) {
      return
    }
    swapRecipes(recipeToAdd, recipeToRemove, 'swapModal')
    clearBasketNotValidError()
  }, [clearBasketNotValidError, swapRecipes, recipeToAdd, recipeToRemove])

  return (
    <ModalComponent visible={shouldShow} styleName={css.basketErrorModal}>
      <ModalTitle className={css.basketErrorModalTitleWrapper}>
        <h1 className={css.basketErrorModalTitle}>{title}</h1>
        <button type="button" className={css.basketErrorModalCloseX} onClick={closeModal} />
      </ModalTitle>
      <ModalContent className={css.basketErrorContent}>
        {brokenRulesToDisplay.map(({ description, recipes }, idx) => (
          <div key={`${idx + 1}`} className={css.basketErrorRuleRow}>
            <p>{description}</p>
            <h2 className={css.basketErrorContentTitle}>Currently in your basket:</h2>
            {recipes && (
              <ul className={css.basketErrorList}>
                {recipes.map((recipe, index) => (
                  <li key={`${index + 1}`} className={css.ruleRecipeListRow}>
                    <img
                      src={recipe.imageUrl}
                      alt={`imageFor-${recipe.title}`}
                      className={css.recipeListItemImage}
                    />
                    <h4 className={css.recipeListItemTitle}>{recipe.title}</h4>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ModalContent>
      <ModalFooter className={css.basketErrorFooter}>
        {shouldShowSwapButton ? (
          <Button
            className={css.basketErrorModalCloseButton}
            color="secondary"
            onClick={closeModal}
          >
            Close
          </Button>
        ) : (
          <Button
            className={css.basketErrorModalCloseFullButton}
            width="full"
            color="primary"
            onClick={closeModal}
          >
            Close
          </Button>
        )}
        {shouldShowSwapButton && (
          <Button className={css.basketErrorModalSwapButton} color="primary" onClick={onSwapClick}>
            Swap meal
          </Button>
        )}
      </ModalFooter>
    </ModalComponent>
  )
}
