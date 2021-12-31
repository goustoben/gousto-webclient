import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import config from 'config/menu'
import GoustoImage from 'Image'
import { jsx } from '@emotion/react'
import { FontWeight, Text, Box, FlexDirection, Space } from '@gousto-internal/zest-react'
import { ButtonsContainer } from '../Buttons'
import css from './OrderedRecipe.css'

export const OrderedRecipes = ({ title, recipeId, stock, media, featureBtn, isFineDineIn }) => (
  <>
    <Box display="flex" flexDirection={FlexDirection.Row} paddingBottom={2}>
      <GoustoImage media={media.getIn([1, 'src'])} title={title} className={css.image} />
      <Space size={3} direction="horizontal" />
      <Text fontWeight={FontWeight.SemiBold}>{title}</Text>
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
    </Box>

    {/* <div className={css.container}>
      <GoustoImage media={media.getIn([1, 'src'])} title={title} className={css.image} />

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
    </div> */}
  </>
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
