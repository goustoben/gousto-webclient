import React from 'react'

import { Box, Text, Space, FontWeight, FontFamily, Color } from '@gousto-internal/citrus-react'
import GoustoImage from 'Image'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import config from 'config/menu'

import { ButtonsContainer } from '../Buttons'

import css from './OrderedRecipe.css'

export const OrderedRecipes = ({ title, recipeId, stock, media, featureBtn, isFineDineIn }) => (
  <>
    <Box display="flex" paddingBottom={2}>
      <GoustoImage media={media.getIn([1, 'src'])} title={title} className={css.image} />
      <Space size={4} direction="horizontal" />
      <Box>
        <Text fontWeight={FontWeight.SemiBold} fontFamily={FontFamily.SemiBold} size={2}>
          {title}
        </Text>
        {isFineDineIn ? (
          <Box
            bg={Color.Informative_50}
            borderRadius={2.5}
            display="inline-block"
            paddingV={0.5}
            paddingH={1}
          >
            <Text size={0} fontWeight={FontWeight.Normal}>
              Fine Dine In
            </Text>
          </Box>
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
    </Box>
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
