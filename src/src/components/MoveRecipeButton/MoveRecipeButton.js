import React from 'react'
import { PropTypes } from 'prop-types'
import css from './MoveRecipeButton.css'

const MoveRecipeButton = ({ fromBox, recipeId }) => {
  const buttonText = fromBox ? '\u2193 Move to shortlist' : '\u2191 Add to box'
  const style = fromBox ? css.moveFromButton : css.addToButton

  return (
    <div className={css.moveButtonWrapper}>
      <button type="button" className={style}>{buttonText}</button>
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
