import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './RecipeAttribute.css'
import { getDescription } from './config'

const blankSpace = String.fromCharCode(160)

const RecipeAttribute = ({ svgFileName, attributeName, attributeValue, showAttribute, view }) => (
  showAttribute !== false && (
    <div className={css.attribute}>
        <Svg
          fileName={svgFileName}
          className={css.icon}
        />
        <span className={css.description}>
          {blankSpace}{blankSpace}{getDescription(attributeName, attributeValue, view)}
        </span>
    </div>
  )
)

RecipeAttribute.propTypes = {
  svgFileName: PropTypes.string.isRequired,
  attributeName: PropTypes.string.isRequired,
  attributeValue: PropTypes.string.isRequired,
  showAttribute: PropTypes.bool,
  view: PropTypes.string,
}

export { RecipeAttribute }
