import validator from 'validator'
import ruleMessages from 'validations/ruleMessages'

const mergeErrorMessages = (errors, fieldPath, value) => {
  if (typeof fieldPath === 'string')		{
    return mergeErrorMessages(errors, fieldPath.split('.'), value)
  }	else if (fieldPath.length === 1 && value !== undefined)		{
    errors[fieldPath[0]] = value // eslint-disable-line no-param-reassign

    return errors
  }	else if (fieldPath.length === 0)		{
    return errors
  }

  if (!errors[fieldPath[0]]) {
    errors[fieldPath[0]] = {} // eslint-disable-line no-param-reassign
  }

  return mergeErrorMessages(errors[fieldPath[0]], fieldPath.slice(1), value)
}

const getReference = (obj, field = '') => field.split('.').reduce((object, index) => (object ? object[index] : ''), obj)

export default (rules, data, props, errorMessages = {}) => Object.keys(rules).reduce((allError, fieldName) => {
  const validationRule = rules[fieldName]
  const fieldValue = getReference(data, fieldName)
  const value = fieldValue ? String(fieldValue) : ''

  validationRule.rules.some((rule) => {
    let valid
    if (typeof rule === 'object') {
      valid = validator[rule.name](value, rule.options || {})
    } else if (typeof rule === 'string') {
      valid = validator[rule](value)
    } else if (typeof rule === 'function') {
      valid = rule(data, props)
    }

    if (valid !== true) {
      let errorMessage
      if (valid && valid.errorMessage) {
        errorMessage = valid.errorMessage
      } else if (typeof ruleMessages[rule.name] === 'function') {
        errorMessage = ruleMessages[rule.name](validationRule.field, rule.options || {})
      } else if (typeof ruleMessages[rule] === 'string') {
        errorMessage = ruleMessages[rule]
      } else if (errorMessages[fieldName]) {
        errorMessage = errorMessages[fieldName]
      }

      mergeErrorMessages(allError, fieldName, errorMessage)

      return true
    }

    return false
  })

  return allError
}, {})
