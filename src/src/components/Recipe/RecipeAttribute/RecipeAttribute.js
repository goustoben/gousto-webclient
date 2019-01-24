import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './RecipeAttribute.css'
import { getDescription } from './config'

const blankSpace = String.fromCharCode(160)

const RecipeAttribute = ({ svgFileName, attributeName, attributeValue, view }) => {

  return (
    <div className={css.attribute}>
        { svgFileName ?
          <Svg
            fileName={svgFileName}
            className={css.icon}
          />
          :
          <div className={css[`${attributeName}-icon`]}/>
        }
        <span className={css.description}>
          {blankSpace}{getDescription(attributeName, attributeValue, view)}
        </span>
    </div>
  )

}

RecipeAttribute.propTypes = {
  svgFileName: PropTypes.string.isRequired,
  attributeName: PropTypes.string.isRequired,
  attributeValue: PropTypes.string.isRequired,
  view: PropTypes.string,
}

export { RecipeAttribute }
