import React from 'react'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'
import css from './MoveRecipeButton.css'

const MoveRecipeButton = ({ fromBox, recipeId, isBasketLimitReached, isShortlistLimitReached, moveToBox, moveToShortlist }) => {
  const arrowStyle = fromBox ? css.arrowDown : css.arrowUp
  const buttonText = fromBox ? 'Move to shortlist' : 'Add to box'
  const disableText = fromBox ? 'Shortlist full' : 'Box full'
  const disableButton = fromBox ? isShortlistLimitReached : isBasketLimitReached
  const style = fromBox ? css.moveFromButton : css.addToButton
  const callToAction = fromBox ? moveToShortlist : moveToBox

  return (
    <button type="button" disabled={disableButton} className={classnames(style, { [css.disableButton]: disableButton })} onClick={() => callToAction(recipeId)}>
      <span className={arrowStyle}></span>
      {disableButton ? disableText : buttonText}
    </button>
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
