import React, { PropTypes } from 'react'
import classnames from 'classnames'
import css from './Banner.css'

const Banner = ({ hide, onClick, text, linkText }) => (
	<div
		onClick={() => { onClick() }}
		className={classnames(
			css.container,
			css.link,
			{ [css.hide]: hide },
		)}
	>
		<p className={css.text}>{text}&nbsp;
			<span className={css.linkUnderlined} >{linkText}</span>
		</p>
	</div>
)

Banner.propTypes = {
	hide: PropTypes.bool,
	onClick: PropTypes.func,
	text: PropTypes.string,
	linkText: PropTypes.string,
}

Banner.defaultProps = {}

export default Banner
