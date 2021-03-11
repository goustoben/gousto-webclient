import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import sanitizeText from 'utils/sanitizeText'
import css from './Title.css'

const Title = ({ title, view, mouseEnter, mouseLeave, linkUnderlined }) => {
  const shouldAddRecipeIcon = !(['detail', 'simple', 'fineDineInDetail'].includes(view))
  const recipeTitle = (view === 'featured' || view === 'simple')
    ? sanitizeText.removeDiacritics(title)
    : title

  return (
    <h2
      className={classNames(
        { [css.containerLG]: (view !== 'featured') },
        { [css.largeHeading]: view === 'featured' },
        { [css.detailHeading]: view === 'detail' },
        { [css.simpleHeading]: view === 'simple' },
        { [css.fineDineInHeading]: view === 'fineDineIn' },
        { [css.fineDineInDetailHeading]: view === 'fineDineInDetail' },
        { [css.linkUnderlined]: linkUnderlined },
      )}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {recipeTitle}
      {shouldAddRecipeIcon && <span className={classNames(css.icon, css.largeIcon)} />}
    </h2>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  mouseEnter: PropTypes.func,
  mouseLeave: PropTypes.func,
  linkUnderlined: PropTypes.bool,
}

Title.defaultProps = {
  mouseEnter: () => { },
  mouseLeave: () => { },
  linkUnderlined: false,
}

export { Title }
