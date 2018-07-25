
function restrictProps(currentProps, restrictedProps, defaultProps = {}) {
	const newProps = {
		...defaultProps,
	}
	Object.keys(currentProps)
		.filter(key => restrictedProps.indexOf(key) === -1)
		.forEach(key => {
			newProps[key] = currentProps[key]
		})

	return newProps
}

export default restrictProps
