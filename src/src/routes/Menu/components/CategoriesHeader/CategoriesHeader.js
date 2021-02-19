import React from 'react'
import PropTypes from 'prop-types'
import { CTABack } from 'zest/CTABack'

import css from './CategoriesHeader.css'

const CategoriesHeader = ({ categoryTitle }) => {
  if (!categoryTitle) return null

  return (
    <div className={css.titleWrapper}>
      <div className={css.buttonWrapper}>
        <CTABack label="Back" />
      </div>
      <span className={css.title}>{categoryTitle}</span>
    </div>
  )
}

CategoriesHeader.propTypes = {
  categoryTitle: PropTypes.string
}

CategoriesHeader.defaultProps = {
  categoryTitle: null
}

export { CategoriesHeader }
