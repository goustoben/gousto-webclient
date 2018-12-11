export const isSubmitting = state => {
  let submitting = false

  if (state.form) {
    submitting = Object.keys(state.form).reduce((acc, val) =>
      acc || (state.form[val] && state.form[val].submitting)
    , false)
  }

  if (state.pending && state.pending.get('CHECKOUT_CARD_SUBMIT')) {
    submitting = true
  }

  return submitting
}

export const isBillingAddressDifferent = (formValues, sectionName) => (
  formValues && formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent ? true : false
)
