import React, { PropTypes } from 'react'
import classnames from 'classnames'
import css from './SectionHeader.css'

const SectionHeader = ({ title, children, type, contentAlign, contentSizeMax }) => (
	<header className={css[`${type}Container`]} >
		<div className={classnames(css[`${type}Content`], css[`${type}ContentMax${contentSizeMax}`], css[`${contentAlign}Align`])} >
			<h1 className={css[`${type}Title`]}>{title}</h1>
			{children}
		</div>
	</header>
)

SectionHeader.propTypes = {
	children: PropTypes.node,
	contentAlign: PropTypes.oneOf(['', 'left', 'center', 'right']),
	contentSizeMax: PropTypes.oneOf(['', 'LG']),
	type: PropTypes.oneOf(['', 'page', 'article', 'minorArticle']),
	title: PropTypes.oneOf([PropTypes.node, PropTypes.string]).isRequired,
}

SectionHeader.defaultProps = {
	contentAlign: '',
	contentSizeMax: '',
	type: 'page',
}

export default SectionHeader
