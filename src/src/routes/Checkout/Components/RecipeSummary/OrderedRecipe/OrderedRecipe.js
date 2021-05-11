import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import config from 'config/menu'
import GoustoImage from 'Image'
import { ButtonsContainer } from '../Buttons'
import css from './OrderedRecipe.css'

export const OrderedRecipes = ({ title, recipeId, stock, media, featureBtn, isFineDineIn }) => (
  <div className={css.container}>
    <GoustoImage media={media} title={title} className={css.image} />
    <div className={css.recipeContainer}>
      <div className={css.recipeName}>
        <span className={css.recipeTitle}>{title}</span>
        {isFineDineIn ? (
          <span className={css.detailsRow}>
            <span className={css.fineDineIn}>Fine Dine In</span>
          </span>
        ) : null}
        {featureBtn && (
          <ButtonsContainer
            view="checkout"
            recipeId={recipeId}
            outOfstock={stock <= config.stockThreshold && stock !== null}
            stock={stock}
            disabled={false}
            showControl
          />
        )}
      </div>
    </div>
  </div>
)

OrderedRecipes.propTypes = {
  title: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  stock: PropTypes.number,
  featureBtn: PropTypes.bool,
  media: PropTypes.instanceOf(Immutable.List),
  isFineDineIn: PropTypes.bool.isRequired,
}

OrderedRecipes.defaultProps = {
  stock: 0,
  media: Immutable.List([]),
  featureBtn: false,
}
