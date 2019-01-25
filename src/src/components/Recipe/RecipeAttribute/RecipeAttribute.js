import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './RecipeAttribute.css'
import { getDescription } from './config'

const RecipeAttribute = ({ icon, name, value, show, view }) => (
  show !== false && (
    <div className={css.attribute}>
        <Svg
          fileName={icon}
          className={css.icon}
        />
        <span className={css.description}>
          &nbsp;&nbsp;{getDescription(name, value, view)}
        </span>
    </div>
  )
)

RecipeAttribute.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  show: PropTypes.bool,
  view: PropTypes.string,
}

export { RecipeAttribute }
