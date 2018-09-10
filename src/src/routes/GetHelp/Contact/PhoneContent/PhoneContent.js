import React, { PropTypes } from 'react'

const PhoneContact = ({ content: { copy1, phoneNumber, phoneNumberLink, copy2 } }) => (
	<div>
		{copy1}
		<a href={`tel:${phoneNumberLink}`}>{phoneNumber}</a>
		{copy2}
	</div>
)

PhoneContact.propTypes = {
	orderIssues: PropTypes.shape({
		copy1: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		copy2: PropTypes.string.isRequired,
	}),
}

export default PhoneContact
