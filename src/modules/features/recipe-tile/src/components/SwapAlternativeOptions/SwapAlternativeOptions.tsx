import React, { useState, useRef } from 'react'

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import PropTypes from 'prop-types'

import { useClickOutside } from './useClickOutside'
import { RecipeAlternativeOptions } from './RecipeAlternativeOptions';
import { cssButton, cssChevron, cssDropWrapper, cssIsExpanded, cssOuterWrapper } from './styles';
import { useTrackingHook } from '../../model/context/useTracking';

const escapeKeyPressed = (e: React.KeyboardEvent) => {
  return e.type === 'keyup' && e.keyCode && e.keyCode === 27
}

export const SwapAlternativeOptions: React.FC<{
  recipeId: string
  categoryId: string
}> = ({ recipeId, categoryId }) => {
  const [showDrop, setShowDrop] = useState(false)
  const useTracking = useTrackingHook()
  const { useTrackingSwapAlternativeOptions } = useTracking()
  const { trackRecipeAlternativeOptionsMenuOpen, trackRecipeAlternativeOptionsMenuSwapRecipes } = useTrackingSwapAlternativeOptions()

  const collectionId = categoryId

  const selectRef = useRef(null)
  useClickOutside(selectRef, () => setShowDrop(false), [showDrop])

  return (
    <div ref={selectRef} css={css(cssOuterWrapper)}>
      <button
        type="button"
        css={css(cssButton)}
        onClick={(e) => {
          e.stopPropagation();
          setShowDrop(!showDrop);

          if (!showDrop) {
            trackRecipeAlternativeOptionsMenuOpen({ recipeId, collectionId })
          }
        }}
        onKeyUp={(e) => {
          e.stopPropagation();

          if (escapeKeyPressed(e)) {
            setShowDrop(false);
          }
        }}
      >
        <span
          css={css(cssChevron)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 -350 1792 1792"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={showDrop
                ? "m 1611,832 q 0,-53 -37,-90 L 923,91 Q 885,53 832,53 778,53 742,91 L 91,742 q -38,36 -38,90 0,53 38,91 l 74,75 q 39,37 91,37 53,0 90,-37 l 486,-486 486,486 q 37,37 90,37 52,0 91,-37 l 75,-75 q 37,-39 37,-91 z"
                : "m 1611,320 q 0,-53 -37,-90 l -75,-75 q -38,-38 -91,-38 -54,0 -90,38 L 832,640 346,155 q -36,-38 -90,-38 -54,0 -90,38 l -75,75 q -38,36 -38,90 0,53 38,91 l 651,651 q 37,37 90,37 52,0 91,-37 l 650,-651 q 38,-38 38,-91 z"
              }
            />
          </svg>
        </span>
      </button>
      {showDrop && (
        <div
          css={css(cssDropWrapper, showDrop ? cssIsExpanded : null)}
          aria-hidden={!showDrop}
        >
          <RecipeAlternativeOptions
            recipeId={recipeId}
            categoryId={categoryId}
            onChangeCheckedRecipe={({ previousRecipeId, nextRecipeId }) => {
              trackRecipeAlternativeOptionsMenuSwapRecipes({
                collectionId,
                previousRecipeId,
                nextRecipeId,
              })
              setShowDrop(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

SwapAlternativeOptions.propTypes = {
  recipeId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
}
