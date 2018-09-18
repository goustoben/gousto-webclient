import React, { PropTypes } from 'react'

import css from './PhoneContent.css'

const PhoneContent = ({ content: { copy1, phoneNumber, phoneNumberLink, copy2 } }) => (
	<div>
		{copy1}
		<a className={css.visibleOnlyOnMobile} href={`tel:${phoneNumberLink}`}>{phoneNumber}</a>
		<span className={css.hiddenOnMobile}>{phoneNumber}</span>
		{copy2}
	</div>
)

PhoneContent.propTypes = {
	orderIssues: PropTypes.shape({
		copy1: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		copy2: PropTypes.string.isRequired,
	}),
}

export default PhoneContent
