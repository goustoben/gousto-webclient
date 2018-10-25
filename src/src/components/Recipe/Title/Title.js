import PropTypes from 'prop-types'
import React from 'react'
import css from './Title.css'
import typography from 'styles/typography.css'
import classNames from 'classnames'
import sanitizeText from 'utils/sanitizeText'

const Title = ({ headlineFont, title, view, mouseEnter, mouseLeave, linkUnderlined }) => {
	const renderTitle = () => (
		<h2
			className={classNames(
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
			{(view === 'featured' || view === 'simple') ? sanitizeText.removeDiacritics(title) : title} {(['detail', 'simple', 'fineDineInDetail'].includes(view)) ? '' : <span className={classNames(css.icon, css.largeIcon)}></span>}
		</h2>
	)

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
	title: '',
	mouseEnter: () => {},
	mouseLeave: () => {},
	linkUnderlined: false,
}

export default Title
