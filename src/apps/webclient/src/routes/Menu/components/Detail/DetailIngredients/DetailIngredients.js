import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import css from '../Detail.css'
import { Ingredients } from './Ingredients'

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
