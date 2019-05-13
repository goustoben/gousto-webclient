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
          name: 'og:type',
          content: 'product',
        },
        {
          name: 'og:title',
          content: recipe.get('title'),
        },
        {
          name: 'og:description',
          content: recipe.get('description'),
        },
        {
          name: 'og:url',
          content: getRecipeDetailURL(recipe),
        },
        {
          name: 'og:image',
          content: getMetaImageLink(recipe),
        },
        {
          name: 'product:brand',
          content: recipe.getIn(['range', 'name'], ''),
        },
        {
          name: 'product:condition',
          content: 'new',
        },
        {
          name: 'product:price:amount',
          content: getPortionPrice(recipe),
        },
        {
          name: 'product:price:currency',
          content: 'GBP',
        },
        {
          name: 'product:retailer_item_id',
          content: recipe.get('id'),
        },
      ]}
    />
  ) : null
)

RecipeMeta.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map),
}
