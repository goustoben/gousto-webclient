
export const capitalizeFirstLetter = (string) => (string.charAt(0).toUpperCase() + string.slice(1))

export const textReducer = (text, item) => {
	if (text && item && text.length && item.length) {
		return `${text}, ${item}`
	} else if (item && item.length) {
		return item
	} else if (text && text.length) {
		return text
	}

	return ''
}

export const replaceWithValues = (cmsString, values) => {
	let result = cmsString
	let regexp

	Object.keys(values).forEach(key => {
		regexp = new RegExp(`{{${key}}}`, 'g')
		result = result.replace(regexp, values[key])
	})

	return result
}
