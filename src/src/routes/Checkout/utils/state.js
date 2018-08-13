export const isSubmitting = state => {
	let submitting = false

	if (state.form) {
		submitting = Object.keys(state.form).reduce((acc, val) =>
			acc || (state.form[val] && state.form[val].submitting)
		, false)
	}

	return submitting
}
