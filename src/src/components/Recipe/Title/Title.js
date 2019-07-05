import PropTypes from 'prop-types'
import React from 'react'
import typography from 'styles/typography.css'
import classNames from 'classnames'
import sanitizeText from 'utils/sanitizeText'
import css from './Title.css'

const Title = ({ headlineFont, title, view, mouseEnter, mouseLeave, linkUnderlined }) => {
  const renderTitle = () => {
    const shouldAddRecipeIcon = !(['detail', 'simple', 'fineDineInDetail'].includes(view))
    const recipeTitle = (view === 'featured' || view === 'simple')
      ? sanitizeText.removeDiacritics(title)
      : title
    const hasEllipsis = view === 'simple'

    return (
      <h2
        className={classNames(
          { [css.titleEllipsis]: hasEllipsis },
          { [css.container]: view === 'gridSmall' },
          { [css.containerLG]: (view !== 'gridSmall' & view !== 'featured') },
          { [css.largeHeading]: view === 'featured' },
          { [css.detailHeading]: view === 'detail' },
          { [css.simpleHeading]: view === 'simple' },
          { [css.fineDineInHeading]: view === 'fineDineIn' },
          { [css.fineDineInDetailHeading]: view === 'fineDineInDetail' },
          { [css.linkUnderlined]: linkUnderlined },
          { [typography.headlineFont]: headlineFont },
        )}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        {recipeTitle}
        {shouldAddRecipeIcon && <span className={classNames(css.icon, css.largeIcon)}/>}
      </h2>
    )
  }

  return renderTitle()
}

Title.propTypes = {
  headlineFont: PropTypes.bool,
  title: PropTypes.string.isRequired,
  view: PropTypes.string,
  mouseEnter: PropTypes.func,
  mouseLeave: PropTypes.func,
  linkUnderlined: PropTypes.bool,
}

Title.defaultProps = {
  mouseEnter: () => {},
  mouseLeave: () => {},
  linkUnderlined: false,
}

export default Title
