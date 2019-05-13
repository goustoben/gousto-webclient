import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import css from './Tag.css'

const Tag = ({ tag, view, centered, spaced }) => (
  <span
    className={classnames(
      { [css.recipeTagSmall]: view === 'smallGrid' },
      { [css.recipeTagSmallSimple]: view === 'simple' },
      { [css.recipeTag]: view !== 'smallGrid' && view !== 'simple' },
      { [css.hide]: !tag },
      { [css.detail]: view === 'detail' },
      { [css.tagCentered]: centered },
      { [css.tagSpaced]: spaced },
    )}
  >
    {tag}
  </span>
)

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  view: PropTypes.string,
  centered: PropTypes.bool,
  spaced: PropTypes.bool,
}

Tag.defaultProps = {
  centered: true,
  spaced: true,
}

export default Tag
