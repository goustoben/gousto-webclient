import React from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { Ingredients } from './Ingredients'

import css from '../Detail.css'

const DetailIngredients = ({ ingredients }) => {
  if (!ingredients || !ingredients.size) {
    return null
  }

  return (
    <div className={css.sectionPanel}>
      <Ingredients ingredients={ingredients} />
    </div>
  )
}

DetailIngredients.propTypes = {
  ingredients: PropTypes.instanceOf(Immutable.List),
}
DetailIngredients.defaultProps = {
  ingredients: Immutable.List([]),
}

export { DetailIngredients }
