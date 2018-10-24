import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import css from './Banner.css'
import { Button } from 'goustouicomponents'

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
		<Button color="tertiary">{linkText}</Button>
	</div>
)

Banner.propTypes = {
	hide: PropTypes.bool,
	onClick: PropTypes.func,
	text: PropTypes.string,
	linkText: PropTypes.string.isRequired,
}

Banner.defaultProps = {}

export default Banner
