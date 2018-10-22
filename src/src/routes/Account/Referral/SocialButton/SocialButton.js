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

SocialButton.propTypes = {
	paymentDate: PropTypes.string,
	text: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func,
}

export default SocialButton
