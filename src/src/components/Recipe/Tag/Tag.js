import React from 'react'
import css from './Tag.css'
import classnames from 'classnames'

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
	tag: React.PropTypes.string.isRequired,
	view: React.PropTypes.string,
	centered: React.PropTypes.bool,
	spaced: React.PropTypes.bool,
}

Tag.defaultProps = {
	centered: true,
	spaced: true,
}

export default Tag
