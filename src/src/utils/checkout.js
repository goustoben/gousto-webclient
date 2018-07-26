export function inferCardType(cardNumber) {
	let type = ''

	if (/^(4026|417500|4405|4508|4844|4913|4917)/.test(cardNumber)) {
		type = 'UKE'
	} else if (/^(50|63|67)/.test(cardNumber)) {
		type = 'MAESTRO'
	} else if (/^4/.test(cardNumber)) {
		type = 'VISA'
	} else if (/^5[1-5]/.test(cardNumber)) {
		type = 'MC'
	} else if (/^3/.test(cardNumber)) {
		type = 'AMEX'
	}

	return type
}

export function getAddress(form) {
	return {
		name: form.get('companyName', 'My Address'),
		line1: form.get('houseNo', ''),
		line2: form.get('street', ''),
		line3: form.get('line3', ''),
		town: form.get('town'),
		county: form.get('county'),
		postcode: form.get('postcode'),
	}
}
