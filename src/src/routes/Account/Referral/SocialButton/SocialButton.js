import React  from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './SocialButton.css'

const SocialButton = ({ text, type, onClick }) => (
	<div className={`${css[`button-${type}`]}`} onClick={onClick}>
		<Svg fileName={`icon-${type}`} className={css.icon} />
		<span className={css.text}>{text}</span>
	</div>
)

const propTypes = {
	text: PropTypes.string,
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func,
}

const defaultProps = {
	text: '',
	onClick: () => {}
}

SocialButton.propTypes = propTypes
SocialButton.defaultProps = defaultProps

export { SocialButton }
