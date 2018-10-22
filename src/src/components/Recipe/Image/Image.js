import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import classnames from 'classnames'

import css from './Image.css'
import GoustoImage from 'Image'

const Image = ({ media, title, view, mouseEnter, mouseLeave, maxMediaSize }) => (
	<div
		className={classnames(
			{ [css[view]]: ['list', 'featured'].indexOf(view) !== -1 },
			{ [css.grid]: ['list', 'featured', 'fineDineInDetail'].indexOf(view) === -1 },
			{ [css.gridSmall]: ['gridSmall'].indexOf(view) !== -1 },
			{ [css.detail]: view === 'detail' },
			{ [css.fineDineInDetail]: view === 'fineDineInDetail' },
			{ [css.simple]: view === 'simple' },
			css.placeholder,
		)}
		onMouseEnter={mouseEnter}
		onMouseLeave={mouseLeave}
	>
		{(media.size > 0) ? (
			<GoustoImage
				media={media}
				title={title}
				maxMediaSize={maxMediaSize}
				className={css.recipeImg}
				lazy
			/>
		) : ''}
	</div>
)

Image.propTypes = {
	media: PropTypes.instanceOf(Immutable.List).isRequired,
	title: PropTypes.string,
	view: PropTypes.string,
	mouseEnter: PropTypes.func,
	mouseLeave: PropTypes.func,
	maxMediaSize: PropTypes.number,
}

Image.defaultProps = {
	title: '',
	view: 'grid',
	mouseEnter: () => {},
	mouseLeave: () => {},
	media: Immutable.List([]),
}

export default Image
