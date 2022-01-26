/**
 * Add prefix to field validation
 * @param prefix
 * @param obj
 * @returns {{}}
 */
export function addPrefix(prefix, obj) {
  const newObj = {}
  Object.keys(obj).forEach((key) => {
    newObj[`${prefix}.${key}`] = obj[key]
  })

  return newObj
}

/*
 * Map Server Errors
 * @param errors
 * @param maps
 * @returns {*}
 */
export function mapServerErrors(errors, maps) {
  return Object.keys(errors).reduce((errorsMap, fieldName) => {
    if (maps[fieldName]) {
      errorsMap[maps[fieldName]] = errors[fieldName] // eslint-disable-line no-param-reassign
    } else {
      errorsMap[fieldName] = errors[fieldName] // eslint-disable-line no-param-reassign
    }

    return errorsMap
  }, {})
}
