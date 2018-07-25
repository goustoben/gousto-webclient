export function showAddress(address) {
	const separator = `${String.fromCharCode(44)}${String.fromCharCode(32)}`

	const addressPieces = []

	const fields = ['houseNo', 'street', 'town', 'county', 'postcode']
	fields.forEach(field => {
		if (address[field]) {
			addressPieces.push(address[field])
		}
	})

	return addressPieces.join(separator)
}

export function isAddressConfirmed(formValues) {
	const sectionName = 'delivery'

	return formValues && formValues[sectionName] && formValues[sectionName].confirmed ?
		formValues[sectionName].confirmed :
		false
}
