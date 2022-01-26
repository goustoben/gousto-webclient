import React, { useState, useRef, SyntheticEvent } from 'react'
import PropTypes from 'prop-types'
import { RecipeAlternativeOptions } from 'routes/Menu/Recipe/VariantRecipeList'
import ModalComponent, { ModalContent, ModalTitle } from 'ModalComponent'
import { useClickOutside } from './useClickOutside'
import { useTracking } from './useTracking'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const css = require('./SwapAlternativeOptions.css')

export const SwapAlternativeOptionsMobile: React.FC<{
  recipeId: string
  originalId: string
  categoryId: string
}> = ({ recipeId, originalId, categoryId }) => {
  const [showModal, setShowModal] = useState(false)

  const collectionId = categoryId
  const { trackRecipeAlternativeOptionsMenuOpen, trackRecipeAlternativeOptionsMenuSwapRecipes } =
    useTracking()

  const selectRef = useRef(null)
  useClickOutside(selectRef, () => setShowModal(false), [showModal])

  const onCloseModal = (e: SyntheticEvent) => {
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <div className={css.outerWrapper}>
      <button
        type="button"
        className={css.button}
        onClick={(e) => {
          e.stopPropagation()
          setShowModal(!showModal)

          if (!showModal) {
            trackRecipeAlternativeOptionsMenuOpen({ recipeId, collectionId })
          }
        }}
      >
        <span className={showModal ? css.arrowUp : css.arrowDown} />
      </button>
      {showModal && (
        <ModalComponent
          visible={showModal}
          styleName={css.variantRecipeListModal}
          from="bottom"
          onClose={onCloseModal}
          overlayContentClassName={css.variantRecipeListOverlayContent}
        >
          <ModalTitle className={css.variantRecipeListModalTitleWrapper}>
            <h1 className={css.variantRecipeListModalTitle}>Options available</h1>
            <button
              type="button"
              className={css.variantRecipeListModalCloseX}
              onClick={onCloseModal}
            />
          </ModalTitle>

          <div ref={selectRef}>
            <ModalContent className={css.variantRecipeListModalContent}>
              <RecipeAlternativeOptions
                recipeId={recipeId}
                originalId={originalId}
                categoryId={categoryId}
                closeOnSelection
                onChangeCheckedRecipe={({ previousRecipeId, nextRecipeId }) =>
                  trackRecipeAlternativeOptionsMenuSwapRecipes({
                    collectionId,
                    previousRecipeId,
                    nextRecipeId,
                  })
                }
              />
            </ModalContent>
          </div>
        </ModalComponent>
      )}
    </div>
  )
}

SwapAlternativeOptionsMobile.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
}
