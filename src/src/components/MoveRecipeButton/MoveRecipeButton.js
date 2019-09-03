import React from 'react'
import { PropTypes } from 'prop-types'
import css from './MoveRecipeButton.css'

const MoveRecipeButton = ({ fromBox, recipeId, isBasketLimitReached, isShortlistLimitReached, moveToBox, moveToShortlist }) => {
  const arrowStyle = fromBox ? css.arrowDown : css.arrowUp
  const buttonText = fromBox ? 'Move to shortlist' : 'Add to box'
  const disableText = fromBox ? 'Shortlist full' : 'Box full'
  const disableButton = fromBox ? isShortlistLimitReached : isBasketLimitReached
  const style = fromBox ? css.moveFromButton : css.addToButton
  const buttonStyle = disableButton ? `${style} ${css.disableButton}` : style
  const callToAction = fromBox ? moveToShortlist : moveToBox

  return (
    <div className={css.moveButtonWrapper}>
      <button type="button" disabled={disableButton} className={buttonStyle} onClick={() => callToAction(recipeId)}>
        <i className={arrowStyle}></i>
        {disableButton ? disableText : buttonText}
      </button>
    </div>
  )
}

MoveRecipeButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  fromBox: PropTypes.bool,
  isBasketLimitReached: PropTypes.bool,
  isShortlistLimitReached: PropTypes.bool,
  moveToBox: PropTypes.func,
  moveToShortlist: PropTypes.func
}

MoveRecipeButton.defaultProps = {
  fromBox: false,
  isBasketLimitReached: false,
  isShortlistLimitReached: false,
  moveToBox: () => { },
  moveToShortlist: () => { }
}

export { MoveRecipeButton }
