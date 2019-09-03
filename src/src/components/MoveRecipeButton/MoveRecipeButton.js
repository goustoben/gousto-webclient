import React from 'react'
import { PropTypes } from 'prop-types'
import css from './MoveRecipeButton.css'

const MoveRecipeButton = ({ fromBox, recipeId }) => {
  const arrowStyle = fromBox ? css.arrowDown : css.arrowUp
  const buttonText = fromBox ? 'Move to shortlist' : 'Add to box'
  const style = fromBox ? css.moveFromButton : css.addToButton

  return (
    <div className={css.moveButtonWrapper}>
      <button type="button" className={style}><i className={arrowStyle}></i> {buttonText}</button>
    </div>
  )
}

MoveRecipeButton.propTypes = {
  fromBox: PropTypes.bool,
  recipeId: PropTypes.string
}

MoveRecipeButton.defaultProps = {
  fromBox: false,
}

export { MoveRecipeButton }
