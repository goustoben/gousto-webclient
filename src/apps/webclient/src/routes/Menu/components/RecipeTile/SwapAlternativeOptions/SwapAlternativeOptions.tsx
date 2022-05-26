import React, { useState, useRef } from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import { EscapeKeyPressed } from 'utils/DOMEvents'

import { RecipeAlternativeOptions } from '../../RecipeAlternativeOptions'
import { useClickOutside } from './useClickOutside'
import { useTracking } from './useTracking'

import css from './SwapAlternativeOptions.css'

export const SwapAlternativeOptions: React.FC<{
  recipeId: string
  originalId: string
  categoryId: string
}> = ({ recipeId, originalId, categoryId }) => {
  const [showDrop, setShowDrop] = useState(false)

  const collectionId = categoryId
  const { trackRecipeAlternativeOptionsMenuOpen, trackRecipeAlternativeOptionsMenuSwapRecipes } =
    useTracking()

  const selectRef = useRef(null)
  useClickOutside(selectRef, () => setShowDrop(false), [showDrop])

  return (
    <div ref={selectRef} className={css.outerWrapper}>
      <button
        type="button"
        className={css.button}
        onClick={(e) => {
          e.stopPropagation()
          setShowDrop(!showDrop)

          if (!showDrop) {
            trackRecipeAlternativeOptionsMenuOpen({ recipeId, collectionId })
          }
        }}
        onKeyUp={(e) => {
          e.stopPropagation()

          if (EscapeKeyPressed(e)) {
            setShowDrop(false)
          }
        }}
      >
        <span className={showDrop ? css.arrowUp : css.arrowDown} />
      </button>
      {showDrop && (
        <div
          className={classnames(css.dropWrapper, { [css.isExpanded]: showDrop })}
          aria-hidden={!showDrop}
        >
          <RecipeAlternativeOptions
            recipeId={recipeId}
            originalId={originalId}
            categoryId={categoryId}
            closeOnSelection
            onChangeCheckedRecipe={({ previousRecipeId, nextRecipeId }) => {
              trackRecipeAlternativeOptionsMenuSwapRecipes({
                collectionId,
                previousRecipeId,
                nextRecipeId,
              })
              setShowDrop(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

SwapAlternativeOptions.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
}
