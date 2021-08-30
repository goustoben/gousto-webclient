export const ruleMessages = {
  isEmail: 'Please provide a valid email address',
  isLength: (field, { min, max }) => {
    let error = ''
    if (min === 1) {
      error = `${field} is required`
    } else if (min > 1) {
      error = `${field} must be at least ${min} characters`
    } else {
      error = `${field} must be under ${max} characters`
    }

    return error
  },
  matches: () => 'Please use only letters (a-z), hyphens (-), apostrophes (\' and ‘) and European special characters.',
}
