import React from 'react'
import Immutable from 'immutable'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import {
  getMetaImageLink,
  getPortionPrice,
  getRecipeDetailURL,
} from './utils'

const RecipeMeta = ({ recipe }) => (
  (recipe) ? (
    <Helmet
      meta={[
        {
          property: 'og:type',
          content: 'product',
        },
        {
          property: 'og:title',
          content: recipe.get('title'),
        },
        {
          property: 'og:description',
          content: recipe.get('description'),
        },
        {
          property: 'og:url',
          content: getRecipeDetailURL(recipe),
        },
        {
          property: 'og:image',
          content: getMetaImageLink(recipe),
        },
        {
          property: 'product:brand',
          content: recipe.getIn(['taxonomy', 1, 'tags', 0, 'name'], ''),
        },
        {
          property: 'product:condition',
          content: 'new',
        },
        {
          property: 'product:price:amount',
          content: getPortionPrice(recipe),
        },
        {
          property: 'product:price:currency',
          content: 'GBP',
        },
        {
          property: 'product:retailer_item_id',
          content: recipe.get('id'),
        },
        {
          property: 'product:availability',
          content: 'available for order',
        },
      ]}
    />
  ) : null
)

RecipeMeta.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map),
}

export { RecipeMeta }
