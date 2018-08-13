
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
