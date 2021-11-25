import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { RecipeAlternativeOptions } from 'routes/Menu/Recipe/VariantRecipeList/VariantRecipeList/RecipeAlternativeOptions'
import { EscapeKeyPressed } from 'utils/DOMEvents'
import { useClickOutside } from './useClickOutside'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const classnames = require('classnames')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const css = require('./SwapAlternativeOptions.css')

export const SwapAlternativeOptions:React.FC<{
  recipeId: string;
  originalId: string;
  categoryId: string;
}> = ({recipeId, originalId, categoryId}) => {
  const [showDrop, setShowDrop] = useState(false)

  const selectRef = useRef(null)
  useClickOutside(
    selectRef,
    () => setShowDrop(false),
    [showDrop],
  )

  return (
    <div
      ref={selectRef}
      className={ css.outerWrapper }
    >
      <button
        type="button"
        className={css.button}
        onClick={(e) => {
          e.stopPropagation()
          setShowDrop(!showDrop)
        }}
        onKeyUp={e => {
          e.stopPropagation()

          if (EscapeKeyPressed(e)) {
            setShowDrop(false)
          }
        }}
      >
        <span className={showDrop ? css.arrowUp : css.arrowDown} />
      </button>
      {showDrop && (
        <div className={classnames(css.dropWrapper, { [css.isExpanded]: showDrop })} aria-hidden={!showDrop}>
          <RecipeAlternativeOptions
            recipeId={recipeId}
            originalId={originalId}
            categoryId={categoryId}
            closeOnSelection
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
