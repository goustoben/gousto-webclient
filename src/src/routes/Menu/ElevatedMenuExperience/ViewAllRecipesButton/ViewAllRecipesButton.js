import React from 'react'
import PropTypes from 'prop-types'
import { CTA } from 'zest/CTA'
import css from './ViewAllRecipesButton.css'

export const ViewAllRecipesButton = ({ onClick }) => (
  <div className={css.wrapper}>
    <CTA isFullWidth onClick={onClick}>
      View all recipes
    </CTA>
  </div>
)

ViewAllRecipesButton.propTypes = {
  onClick: PropTypes.func.isRequired
}
