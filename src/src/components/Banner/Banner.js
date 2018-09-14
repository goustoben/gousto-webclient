import React, { PropTypes } from 'react'
import classnames from 'classnames'
import css from './Banner.css'
import Button from 'Button'

const Banner = ({ hide, onClick, text, linkText }) => (
	<div
		role="button"
		onClick={() => { onClick() }}
		className={classnames(
			css.container,
			css.link,
			{ [css.hide]: hide },
		)}
	>
		<p className={css.text}>{text}&nbsp;</p>
		<Button color="secondary">{linkText}</Button>
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
