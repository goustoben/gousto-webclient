import React, { Fragment } from 'react'
import css from './Recipes.css'

export const N_LOADING_RECIPE_CARDS = 8

export const LoadingRecipeCard = () => (
  <div className={css.loadingRecipeCard}>
    <div className={css.loadingImage} />
    <div className={css.loadingDetails}>
      <div className={css.loadingLine} />
      <div className={css.loadingLine} />
      <div className={css.loadingStars} />
    </div>
  </div>
)

const loadingCards = new Array(N_LOADING_RECIPE_CARDS)
  .fill(null)
  // eslint-disable-next-line react/no-array-index-key
  .map((value, index) => <LoadingRecipeCard key={index} />)

export const LoadingRecipeCards = () => <Fragment>{loadingCards}</Fragment>
