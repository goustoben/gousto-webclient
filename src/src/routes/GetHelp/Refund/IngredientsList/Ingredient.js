import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import placeholderImg from 'media/images/recipe-placeholder.png'
import css from './IngredientsList.css'

const Ingredient = ({ label, srcSet }) => {
  const [srcSetImg, setSrcSetImg] = useState(null)

  useEffect(() => {
    setSrcSetImg(srcSet)
  }, [srcSet])

  const onError = () => {
    setSrcSetImg(placeholderImg)
  }

  return (
    <div className={css.ingredientContainer}>
      <img
        className={css.ingredientImage}
        srcSet={srcSetImg}
        alt={label}
        onError={onError}
      />
      <p className={css.ingredientLabel}>{label}</p>
    </div>
  )
}

Ingredient.propTypes = {
  label: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired
}

export { Ingredient }
